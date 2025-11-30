import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { Header, SideNav } from '@core/components';
import * as AdminActions from '@store/admin';
import * as AdminSelectors from '@store/admin';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.scss'],
  imports: [Header, SideNav, RouterModule, CommonModule]
})
export class UserDashboard implements OnInit {
  private store = inject(Store);
  sideNavOpen = signal(true);

  ngOnInit(): void {
    // Load users data once when dashboard is initialized — only if store is empty
    try {
      const existing = this.store.selectSignal(AdminSelectors.selectAllUsers)();
      if (!existing || existing.length === 0) {
        this.store.dispatch(AdminActions.loadUsers());
      }
    } catch (e) {
      this.store.dispatch(AdminActions.loadUsers());
    }
  }

  toggleSideNav(): void {
    this.sideNavOpen.update(state => !state);
  }
}



