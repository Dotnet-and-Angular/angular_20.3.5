import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap, take, filter, withLatestFrom } from "rxjs";
import { createUser, createUserFailure, createUserSuccess, loadPersons, loadPersonsFailure, loadPersonsSuccess, loadUser, loadUserFailure, loadUserSuccess, setToken, setUser } from "./user.actions";
import { UserLogin, AdminService } from "@services";
import { inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectUser } from "@store/user";


export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserLogin);
    private adminService = inject(AdminService);
    private store = inject(Store);
    private router = inject(Router);

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            mergeMap((payload) =>
                this.userService.login({ usernameOrEmail: payload.usernameOrEmail, password: payload.password, role: payload.role }).pipe(
                    tap((res: any) => {
                        // Extract data from API response
                        const role = res?.role || 'user';
                        const usernameOrEmail = payload.usernameOrEmail;
                        const token = res?.token;
                        const isNewUser = res?.isNewUser || false;
                        const profileData = res?.profile || {};

                        // Build profile display data from API response
                        const profile = {
                            firstName: profileData?.firstName || 'User',
                            lastName: profileData?.lastName || '',
                            bio: profileData?.bio || '',
                            email: profileData?.email || usernameOrEmail,
                            phone: profileData?.phone || '',
                            location: profileData?.location || '',
                            department: profileData?.department || '',
                            role: role,
                            memberSince: profileData?.memberSince || new Date().toLocaleDateString(),
                            status: profileData?.status || 'Active',
                            lastLogin: profileData?.lastLogin || new Date().toLocaleString(),
                            verified: profileData?.verified || false,
                        };

                        // Store token with role
                        this.store.dispatch(setToken({ token, role }));

                        // Store user state with profile and profileData
                        this.store.dispatch(setUser({ username: usernameOrEmail, role, profile, isNewUser, profileData }));
                    }),
                    map((res: any) => {
                        return loadUserSuccess({ action: res });
                    }),
                    catchError(error => {
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
                this.adminService.listUsers().pipe(
                    map((persons) => loadPersonsSuccess({ persons })),
                    catchError(error => of(loadPersonsFailure({ error: error.message })))
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUser),
            mergeMap((payload) => {
                // Extract only the necessary fields for the API payload
                const registrationData = {
                    usernameOrEmail: payload.usernameOrEmail,
                    password: payload.password,
                    role: payload.role
                };
                return this.userService.register(registrationData).pipe(
                    map((res: any) => {
                        return createUserSuccess({ action: res });
                    }),
                    catchError(error => of(createUserFailure({ error })))
                );
            })
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
                    if (user?.role === 'admin') {
                        this.router.navigate(['/admin']);
                    } else if (user?.role === 'user') {
                        this.router.navigate(['/user']);
                    } else {
                        this.router.navigate(['/login']);
                    }
                })
            ),
        { dispatch: false }
    );
}
