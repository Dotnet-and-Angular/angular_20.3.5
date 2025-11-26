import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../components/user/user-state-store/user.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private router: Router, private store: Store) { }

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean | UrlTree> {
        const requiredRole = route.data['role'] as string;

        return this.store.pipe(
            select(selectUser),
            map((user) => {
                console.log('RoleGuard - User:', user, 'Required Role:', requiredRole);

                if (!user || !user.role) {
                    console.log('RoleGuard - No user or role, redirecting to login');
                    return this.router.parseUrl('/login');
                }

                if (requiredRole && user.role !== requiredRole) {
                    console.log('RoleGuard - Role mismatch. User role:', user.role, 'Required:', requiredRole, 'Redirecting to /user');
                    return this.router.parseUrl('/user/user-data');
                }

                console.log('RoleGuard - Access granted');
                return true;
            })
        );
    }
}
