import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [RouterModule]
})
export class Header implements OnDestroy {
  currentUrl = '';
  private sub: Subscription | null = null;

  constructor(private router: Router) {
    // track current route to conditionally render buttons
    this.currentUrl = this.router.url || '';
    this.sub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects || e.url;
      }
    });
  }

  get isAuthenticated() {
    return !!(localStorage.getItem('token') || localStorage.getItem('auth_token'));
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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
