import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUserRole } from '@store/user';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private router: Router, private store: Store) { }

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean | UrlTree> {
        const requiredRole = route.data['role'] as string;

        return this.store.pipe(
            select(selectUserRole),
            take(1),
            map((userRole) => {
                if (!userRole || userRole.trim() === '') {
                    return this.router.parseUrl('/login');
                }
                // Exact role match
                if (userRole === requiredRole) {
                    return true;
                }
                // Admins can access user routes as well
                if (userRole === 'admin' && requiredRole === 'user') {
                    return true;
                }
                // If not authorized, redirect to user home
                if (userRole === 'user') {
                    return this.router.parseUrl('/user');
                } else if (userRole === 'admin') {
                    return this.router.parseUrl('/admin');
                } else {
                    return this.router.parseUrl('/login');
                }
            })
        );
    }
}
