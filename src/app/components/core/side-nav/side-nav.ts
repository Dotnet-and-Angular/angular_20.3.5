import { CommonModule } from "@angular/common";
import { Component, signal, input, computed, inject } from '@angular/core';
import { SIDENAV_ITEMS, ADMIN_ITEMS, SidenavItem } from './side-nav-list';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../user/user-state-store/user.selector';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private store = inject(Store);

  isOpen = input(true);
  userRole = signal<string>('');

  sidenavItems = computed(() => {
    const role = this.userRole();
    const allItems = role === 'admin' ? [...SIDENAV_ITEMS, ...ADMIN_ITEMS] : SIDENAV_ITEMS;
    return allItems.filter(item => !item.requiredRole || item.requiredRole === role);
  });

  expandedItems = signal<Set<string>>(new Set());
  currentYear = new Date().getFullYear();

  constructor() {
    this.store.pipe(select(selectUser)).subscribe((user: any) => {
      this.userRole.set(user?.role || 'user');
    });
  }

  isItemExpanded = computed(() => {
    const expanded = this.expandedItems();
    return (itemId: string) => expanded.has(itemId);
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

  onNavClick(): void {
    // Close side-nav on mobile after navigation
    if (window.innerWidth <= 768) {
      // Parent component manages closing via toggleSideNav
    }
  }
}
