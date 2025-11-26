import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as AdminActions from './admin.actions';
import { initialAdminState } from './admin.state';

@Injectable({ providedIn: 'root' })
export class AdminEffects {
    private actions$ = inject(Actions);

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
}
