import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthToken } from '@store/user';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private store = inject(Store);
    private token = '';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.pipe(select(getAuthToken)).subscribe((token) => {
            this.token = token;
        });
        if (this.token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}
