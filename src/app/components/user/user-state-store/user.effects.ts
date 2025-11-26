import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap, switchMap, take, delay, filter, withLatestFrom, distinctUntilChanged } from "rxjs";
import { createUser, createUserFailure, createUserSuccess, loadPersons, loadPersonsFailure, loadPersonsSuccess, loadUser, loadUserFailure, loadUserSuccess, setToken, setUser } from "./user.actions";
import { UserLogin } from "../../../services/user-login";
import { inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { Person } from "../../../services/person/person";
import { selectUser } from "./user.selector";


export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserLogin);
    private store = inject(Store);
    private router = inject(Router);
    private personService = inject(Person);

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            mergeMap((payload) =>
                this.userService.login({ username: payload.username, password: payload.password }).pipe(
                    tap((res: any) => {
                        // Extract role from response or use mock value
                        // MOCK: If mockAsAdmin is true, set role to 'admin', otherwise 'user'
                        const role = payload.mockAsAdmin ? 'admin' : (res?.role || 'user');
                        const username = payload.username;

                        // Mock token if not provided by backend
                        const token = res?.token || `mock-token-${Date.now()}`;

                        console.log('=== LOGIN EFFECT START ===');
                        console.log('Mock as Admin:', payload.mockAsAdmin);
                        console.log('Role to set:', role);
                        console.log('Token:', token);

                        // Store token with role FIRST
                        this.store.dispatch(setToken({ token, role }));
                        console.log('Dispatched setToken with role:', role);

                        // Store user state (no API call during login)
                        this.store.dispatch(setUser({ username, role }));
                        console.log('Dispatched setUser with role:', role);
                    }),
                    map((res: any) => {
                        console.log('Login success, returning loadUserSuccess');
                        return loadUserSuccess({ action: res });
                    }),
                    catchError(error => {
                        console.error('Login error:', error);
                        return of(loadUserFailure({ error }));
                    })
                )
            )
        )
    );

    loadPersons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPersons),
            mergeMap(() =>
                this.personService.getAll().pipe(
                    map((persons) => loadPersonsSuccess({ persons })),
                    catchError(error => of(loadPersonsFailure({ error: error.message })))
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUser),
            mergeMap((payload) =>
                this.userService.register(payload).pipe(
                    map((res: any) => {
                        return createUserSuccess({ action: res });
                    }),
                    catchError(error => of(createUserFailure({ error })))
                )
            )
        )
    );

    // Navigate after successful login when user state is updated
    navigateAfterLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadUserSuccess),
                withLatestFrom(
                    this.store.pipe(
                        select(selectUser),
                        filter(user => !!user?.role), // Wait until role is actually set
                        take(1)
                    )
                ),
                tap(([_, user]) => {
                    console.log('=== NAVIGATION EFFECT ===');
                    console.log('Current user state:', user);
                    console.log('User role:', user?.role);

                    if (user?.role === 'admin') {
                        console.log('USER IS ADMIN - Navigating to /admin');
                        this.router.navigate(['/admin']);
                    } else if (user?.role === 'user') {
                        console.log('USER IS USER - Navigating to /user');
                        this.router.navigate(['/user']);
                    } else {
                        console.log('NO ROLE FOUND - Navigating to /login');
                        this.router.navigate(['/login']);
                    }
                })
            ),
        { dispatch: false }
    );
}
