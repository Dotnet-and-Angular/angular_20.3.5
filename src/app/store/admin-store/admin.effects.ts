import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import * as AdminActions from '@store/admin';
import { initialAdminState } from '@store/admin';
import { AdminService } from '@services';

@Injectable({ providedIn: 'root' })
export class AdminEffects {
    private actions$ = inject(Actions);
    private adminService = inject(AdminService);

    loadAdminData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadAdminData),
            map(() => {
                // TODO: Replace with actual API call to admin service
                const { users, permissions, roles, analyticsData, userActivityData, roleDistribution } = initialAdminState;
                return AdminActions.loadAdminDataSuccess({
                    users,
                    permissions,
                    roles,
                    analyticsData,
                    userActivityData,
                    roleDistribution
                });
            }),
            catchError(error => of(AdminActions.loadAdminDataFailure({ error: error.message })))
        )
    );

    updateRolePermissions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateRolePermissions),
            switchMap(({ roleId, permissions }) => {
                return this.adminService.updateRolePermissions(roleId, permissions).pipe(
                    map(() => AdminActions.updateRolePermissionsSuccess({ roleId, permissions })),
                    catchError(error => of(AdminActions.updateRolePermissionsFailure({ error: error.message })))
                );
            })
        )
    );

    loadAdmins$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadAdmins),
            exhaustMap(() => {
                return this.adminService.listAdmins().pipe(
                    map(admins => AdminActions.loadAdminsSuccess({ admins })),
                    catchError(error => of(AdminActions.loadAdminsFailure({ error: error.message })))
                );
            })
        )
    );

    searchAdmins$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.searchAdmins),
            switchMap(({ username }) => {
                return this.adminService.searchAdmin(username).pipe(
                    map(admins => AdminActions.searchAdminsSuccess({ admins })),
                    catchError(error => of(AdminActions.searchAdminsFailure({ error: error.message })))
                );
            })
        )
    );

    registerAdmin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.registerAdmin),
            switchMap(({ admin }) => {
                return this.adminService.registerAdmin(admin).pipe(
                    map(newAdmin => AdminActions.registerAdminSuccess({ admin: newAdmin })),
                    catchError(error => of(AdminActions.registerAdminFailure({ error: error.message })))
                );
            })
        )
    );

    updateAdmin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateAdmin),
            switchMap(({ id, admin }) => {
                return this.adminService.updateAdmin(id, admin).pipe(
                    map(updatedAdmin => AdminActions.updateAdminSuccess({ admin: updatedAdmin })),
                    catchError(error => of(AdminActions.updateAdminFailure({ error: error.message })))
                );
            })
        )
    );

    deleteAdmin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteAdmin),
            switchMap(({ id }) => {
                return this.adminService.deleteAdmin(id).pipe(
                    map(() => AdminActions.deleteAdminSuccess({ id })),
                    catchError(error => of(AdminActions.deleteAdminFailure({ error: error.message })))
                );
            })
        )
    );

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadUsers),
            exhaustMap(() => {
                return this.adminService.listUsers().pipe(
                    map(users => AdminActions.loadUsersSuccess({ users })),
                    catchError(error => of(AdminActions.loadUsersFailure({ error: error.message })))
                );
            })
        )
    );

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.searchUsers),
            switchMap(({ username }) => {
                return this.adminService.searchUser(username).pipe(
                    map(users => AdminActions.searchUsersSuccess({ users })),
                    catchError(error => of(AdminActions.searchUsersFailure({ error: error.message })))
                );
            })
        )
    );

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.registerUser),
            switchMap(({ user }) => {
                return this.adminService.registerUser(user).pipe(
                    map(newUser => AdminActions.registerUserSuccess({ user: newUser })),
                    catchError(error => of(AdminActions.registerUserFailure({ error: error.message })))
                );
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateUser),
            switchMap(({ id, user }) => {
                return this.adminService.updateUser(id, user).pipe(
                    map(updatedUser => AdminActions.updateUserSuccess({ user: updatedUser })),
                    catchError(error => of(AdminActions.updateUserFailure({ error: error.message })))
                );
            })
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteUser),
            switchMap(({ userId }) => {
                return this.adminService.deleteUser(userId).pipe(
                    map(() => AdminActions.deleteUserSuccess({ userId })),
                    catchError(error => of(AdminActions.deleteUserFailure({ error: error.message })))
                );
            })
        )
    );

    toggleUserStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.toggleUserStatus),
            switchMap(({ userId }) => {
                return this.adminService.toggleUserStatus(userId).pipe(
                    map(user => AdminActions.updateUserSuccess({ user })),
                    catchError(error => of(AdminActions.updateUserFailure({ error: error.message })))
                );
            })
        )
    );
}