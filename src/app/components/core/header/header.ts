import { Component, OnDestroy, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getAuthToken, selectUser, logout } from '@store/user';
import { GLOBAL_MESSAGES } from '@constants';
import { SvgIconComponent } from '@shared';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [RouterModule, CommonModule, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnDestroy {
  toggleSideNav = output<void>();
  currentUrl = '';
  private token = '';
  username = '';
  userRole = '';
  userEmail = '';
  private subs: Subscription[] = [];
  labels = GLOBAL_MESSAGES.HEADER;
  private store = inject(Store);

  constructor(private router: Router) {
    this.currentUrl = this.router.url || '';
    this.subs.push(this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects || e.url;
      }
    }));

    this.subs.push(this.store.pipe(select(getAuthToken)).subscribe((res: any) => {
      this.token = res || '';
    }));

    this.subs.push(this.store.pipe(select(selectUser)).subscribe((user: any) => {
      this.username = user?.username || '';
      this.userRole = user?.role || '';
      // Extract email from profile if available
      this.userEmail = user?.profile?.email || '';
    }));
  }

  get isAuthenticated() {
    return !!this.token;
  }

  get isDashboard() {
    return this.currentUrl.startsWith('/user') || this.currentUrl.startsWith('/admin');
  }

  get isLoginRoute() {
    return this.currentUrl.startsWith('/login');
  }

  get isRegisterRoute() {
    return this.currentUrl.startsWith('/register');
  }

  get usernameInitials() {
    if (!this.username) return '';
    const parts = this.username.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  toggleMenu(): void {
    this.toggleSideNav.emit();
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
