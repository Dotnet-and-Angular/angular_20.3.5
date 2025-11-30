import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RoleGuard } from './role.guard';
import { selectUserRole } from '../components/user/user-state-store/user.selector';

describe('RoleGuard', () => {
    let guard: RoleGuard;
    let router: jasmine.SpyObj<Router>;
    let store: jasmine.SpyObj<Store>;

    beforeEach(() => {
        const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
        const storeSpy = jasmine.createSpyObj('Store', ['pipe']);

        TestBed.configureTestingModule({
            providers: [
                RoleGuard,
                { provide: Router, useValue: routerSpy },
                { provide: Store, useValue: storeSpy }
            ]
        });

        guard = TestBed.inject(RoleGuard);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    });

    describe('Admin Role Access', () => {
        it('should allow admin user to access admin route', (done) => {
            const route = {
                url: [{ path: 'admin' }],
                data: { role: 'admin' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('admin'));

            guard.canActivate(route).subscribe((result) => {
                expect(result).toBe(true);
                done();
            });
        });

        it('should redirect admin user trying to access user route', (done) => {
            const route = {
                url: [{ path: 'user' }],
                data: { role: 'user' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('admin'));
            const parseUrlSpy = jasmine.createSpyObj('UrlTree', ['toString']);
            router.parseUrl.and.returnValue(parseUrlSpy);

            guard.canActivate(route).subscribe((result) => {
                expect(router.parseUrl).toHaveBeenCalledWith('/admin');
                done();
            });
        });
    });

    describe('User Role Access', () => {
        it('should allow user to access user route', (done) => {
            const route = {
                url: [{ path: 'user' }],
                data: { role: 'user' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('user'));

            guard.canActivate(route).subscribe((result) => {
                expect(result).toBe(true);
                done();
            });
        });

        it('should redirect user trying to access admin route', (done) => {
            const route = {
                url: [{ path: 'admin' }],
                data: { role: 'admin' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('user'));
            const parseUrlSpy = jasmine.createSpyObj('UrlTree', ['toString']);
            router.parseUrl.and.returnValue(parseUrlSpy);

            guard.canActivate(route).subscribe((result) => {
                expect(router.parseUrl).toHaveBeenCalledWith('/user');
                done();
            });
        });
    });

    describe('Unauthenticated Access', () => {
        it('should redirect to login when no user role', (done) => {
            const route = {
                url: [{ path: 'admin' }],
                data: { role: 'admin' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of(''));
            const parseUrlSpy = jasmine.createSpyObj('UrlTree', ['toString']);
            router.parseUrl.and.returnValue(parseUrlSpy);

            guard.canActivate(route).subscribe((result) => {
                expect(router.parseUrl).toHaveBeenCalledWith('/login');
                done();
            });
        });

        it('should redirect to login when user role is null', (done) => {
            const route = {
                url: [{ path: 'user' }],
                data: { role: 'user' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of(null as any));
            const parseUrlSpy = jasmine.createSpyObj('UrlTree', ['toString']);
            router.parseUrl.and.returnValue(parseUrlSpy);

            guard.canActivate(route).subscribe((result) => {
                expect(router.parseUrl).toHaveBeenCalledWith('/login');
                done();
            });
        });
    });

    describe('Observable Management', () => {
        it('should use take(1) to prevent duplicate emissions', (done) => {
            const route = {
                url: [{ path: 'admin' }],
                data: { role: 'admin' }
            } as unknown as ActivatedRouteSnapshot;

            // Create observable that emits multiple times
            const multiEmissionObs = of('admin', 'user', 'admin');
            store.pipe.and.returnValue(multiEmissionObs);

            let emissionCount = 0;
            guard.canActivate(route).subscribe(() => {
                emissionCount++;
            }, null, () => {
                // Should only emit once due to take(1)
                expect(emissionCount).toBe(1);
                done();
            });
        });
    });

    describe('Role Matching', () => {
        it('should perform exact role match - admin', (done) => {
            const route = {
                url: [{ path: 'admin' }],
                data: { role: 'admin' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('admin'));

            guard.canActivate(route).subscribe((result) => {
                expect(result).toBe(true);
                expect(router.parseUrl).not.toHaveBeenCalled();
                done();
            });
        });

        it('should perform exact role match - user', (done) => {
            const route = {
                url: [{ path: 'user-dashboard' }],
                data: { role: 'user' }
            } as unknown as ActivatedRouteSnapshot;

            store.pipe.and.returnValue(of('user'));

            guard.canActivate(route).subscribe((result) => {
                expect(result).toBe(true);
                expect(router.parseUrl).not.toHaveBeenCalled();
                done();
            });
        });
    });
});
