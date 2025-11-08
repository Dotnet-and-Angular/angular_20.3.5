import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAuthToken } from '../../user/user-state-store/user.selector';
import { logout } from '../../user/user-state-store/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [RouterModule]
})
export class Header implements OnDestroy {
  currentUrl = '';
  private token = '';

  private sub: Subscription | null = null;

  constructor(private router: Router, private store: Store) {
    // track current route to conditionally render buttons
    this.currentUrl = this.router.url || '';
    this.sub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects || e.url;
      }
    });
  }

  get isAuthenticated() {
    this.store.pipe(select(getAuthToken)).subscribe({
      next: (res: any) => {
        this.token = res;
      }
    });
    return !!this.token;
  }

  get isDashboard() {
    return this.currentUrl.startsWith('/dashboard');
  }

  get isLoginRoute() {
    return this.currentUrl.startsWith('/login');
  }

  get isRegisterRoute() {
    return this.currentUrl.startsWith('/register');
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
