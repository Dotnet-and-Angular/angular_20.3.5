import { CommonModule } from "@angular/common";
import { Component, signal, input, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { SIDENAV_ITEMS, ADMIN_ITEMS, SidenavItem } from './side-nav-list';
import { RouterModule, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUserRole } from '@store/user';
import { GLOBAL_MESSAGES } from '@constants';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNav {
  private store = inject(Store);
  private router = inject(Router);
  labels = GLOBAL_MESSAGES.SIDEBAR;

  isOpen = input(true);
  userRole = toSignal(this.store.pipe(select(selectUserRole)), { initialValue: '' });

  sidenavItems = computed(() => {
    const role = this.userRole();

    if (role === 'admin') {
      return ADMIN_ITEMS;
    }
    return SIDENAV_ITEMS;
  });

  expandedItems = signal<Set<string>>(new Set());
  currentYear = new Date().getFullYear();

  isItemExpanded = computed(() => {
    const expanded = this.expandedItems();
    return (itemId: string) => expanded.has(itemId);
  });

  // Auto-expand parent items if their child is in the current route
  isParentActive = computed(() => {
    const items = this.sidenavItems();
    const url = this.router.url;
    const activeParents = new Set<string>();

    items.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          // Check if current URL starts with child route
          if (url.startsWith(child.route)) {
            activeParents.add(item.id);
          }
        });
      }
    });

    return (itemId: string) => activeParents.has(itemId);
  });

  trackBySidenavItem(index: number, item: SidenavItem): string {
    return item.id;
  }

  trackBySidenavChildItem(index: number, item: SidenavItem): string {
    return item.id;
  }

  toggleExpanded(itemId: string, event: Event): void {
    event.preventDefault();
    const expanded = new Set(this.expandedItems());
    if (expanded.has(itemId)) {
      expanded.delete(itemId);
    } else {
      expanded.add(itemId);
    }
    this.expandedItems.set(expanded);
  }
}
