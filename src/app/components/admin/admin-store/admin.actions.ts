import { createAction, props } from '@ngrx/store';
import { User, Permission, Role, AnalyticsData, ChartData } from './admin.interface';

// Load Admin Data
export const loadAdminData = createAction('[Admin] Load Admin Data');

export const loadAdminDataSuccess = createAction(
    '[Admin] Load Admin Data Success',
    props<{ users: User[]; permissions: Permission[]; roles: Role[]; analyticsData: AnalyticsData; userActivityData: ChartData[]; roleDistribution: ChartData[] }>()
);

export const loadAdminDataFailure = createAction(
    '[Admin] Load Admin Data Failure',
    props<{ error: string }>()
);

// User Management
export const addUser = createAction('[Admin] Add User', props<{ user: User }>());
export const updateUser = createAction('[Admin] Update User', props<{ user: User }>());
export const deleteUser = createAction('[Admin] Delete User', props<{ userId: number }>());
export const toggleUserStatus = createAction('[Admin] Toggle User Status', props<{ userId: number }>());

// Permissions Management
export const updateRolePermissions = createAction(
    '[Admin] Update Role Permissions',
    props<{ roleId: number; permissions: number[] }>()
);

// Analytics
export const updateAnalyticsData = createAction(
    '[Admin] Update Analytics Data',
    props<{ analyticsData: AnalyticsData }>()
);
