import { CommonModule } from "@angular/common";
import { Component, signal, input, computed } from '@angular/core';
import { SIDENAV_ITEMS, SidenavItem } from './side-nav-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  // Input for drawer state from parent
  isOpen = input(true);

  sidenavItems = signal<SidenavItem[]>(SIDENAV_ITEMS);
  expandedItems = signal<Set<string>>(new Set());

  currentYear = new Date().getFullYear();

  // Check if item is expanded
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
