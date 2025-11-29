import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Header } from '../../core/header/header';
import { SideNav } from '../../core/side-nav/side-nav';
import * as AdminActions from '../../admin/admin-store/admin.actions';
import * as AdminSelectors from '../../admin/admin-store/admin.selector';
import { selectUserRole } from '../../user/user-state-store/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [Header, SideNav, RouterModule, CommonModule]
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  sideNavOpen = signal(true);
  userRole = this.store.selectSignal(selectUserRole);

  constructor() {
    // If user is admin, redirect to admin panel
    effect(() => {
      const role = this.userRole();
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      }
    });
  }

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



