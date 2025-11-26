import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GLOBAL_MESSAGES } from '../../../constants/global-messages';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  labels = GLOBAL_MESSAGES.FOOTER;
  currentUrl = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url || '';
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects || e.url;
      }
    });
  }

  get isLoginRoute() {
    return this.currentUrl.startsWith('/login');
  }

  get isRegisterRoute() {
    return this.currentUrl.startsWith('/register');
  }
}
