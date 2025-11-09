import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuthToken } from '../components/user/user-state-store/user.selector';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private store = inject(Store);
    private router = inject(Router);
    private token = '';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.pipe(select(getAuthToken)).subscribe((token) => {
            this.token = token;
            if (token) {
                this.router.navigate(['/user/dashboard']);
            }
        });
        if (!this.token) {
            return next.handle(req);
        }
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
        return next.handle(cloned);
    }
}
