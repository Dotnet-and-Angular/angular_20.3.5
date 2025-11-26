import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getAuthToken } from '../components/user/user-state-store/user.selector';
import { logout } from '../components/user/user-state-store/user.actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private token = '';
    constructor(private router: Router, private store: Store) { }

    canActivate(): boolean | UrlTree {
        this.store.pipe(select(getAuthToken)).subscribe((token) => {
            console.log('AuthGuard - Token:', token);
            this.token = token;
        });
        if (this.token) {
            console.log('AuthGuard - Authenticated, allowing access');
            return true;
        }
        console.log('AuthGuard - Not authenticated, redirecting to login');
        if (!this.router.url) {
            this.store.dispatch(logout());
            return this.router.parseUrl('/login');
        }
        return this.router.parseUrl('/login');
    }
}
