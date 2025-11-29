import { createAction, props } from '@ngrx/store';
import { User, Permission, Role, AnalyticsData, ChartData } from './admin.interface';

// Admin Interface
interface Admin {
    id?: number;
    username: string;
    email: string;
    role: 'admin' | 'user' | 'editor' | 'viewer';
    status?: 'active' | 'inactive';
    joinDate?: string;
}

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

// Admin Management
export const loadAdmins = createAction('[Admin] Load Admins');
export const loadAdminsSuccess = createAction('[Admin] Load Admins Success', props<{ admins: Admin[] }>());
export const loadAdminsFailure = createAction('[Admin] Load Admins Failure', props<{ error: string }>());

export const searchAdmins = createAction('[Admin] Search Admins', props<{ username: string }>());
export const searchAdminsSuccess = createAction('[Admin] Search Admins Success', props<{ admins: Admin[] }>());
export const searchAdminsFailure = createAction('[Admin] Search Admins Failure', props<{ error: string }>());

export const registerAdmin = createAction('[Admin] Register Admin', props<{ admin: Admin }>());
export const registerAdminSuccess = createAction('[Admin] Register Admin Success', props<{ admin: Admin }>());
export const registerAdminFailure = createAction('[Admin] Register Admin Failure', props<{ error: string }>());

export const updateAdmin = createAction('[Admin] Update Admin', props<{ id: number; admin: Admin }>());
export const updateAdminSuccess = createAction('[Admin] Update Admin Success', props<{ admin: Admin }>());
export const updateAdminFailure = createAction('[Admin] Update Admin Failure', props<{ error: string }>());

export const deleteAdmin = createAction('[Admin] Delete Admin', props<{ id: number }>());
export const deleteAdminSuccess = createAction('[Admin] Delete Admin Success', props<{ id: number }>());
export const deleteAdminFailure = createAction('[Admin] Delete Admin Failure', props<{ error: string }>());

// User Management
export const loadUsers = createAction('[Admin] Load Users');
export const loadUsersSuccess = createAction('[Admin] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Admin] Load Users Failure', props<{ error: string }>());

export const searchUsers = createAction('[Admin] Search Users', props<{ username: string }>());
export const searchUsersSuccess = createAction('[Admin] Search Users Success', props<{ users: User[] }>());
export const searchUsersFailure = createAction('[Admin] Search Users Failure', props<{ error: string }>());

export const registerUser = createAction('[Admin] Register User', props<{ user: Partial<User> }>());
export const registerUserSuccess = createAction('[Admin] Register User Success', props<{ user: User }>());
export const registerUserFailure = createAction('[Admin] Register User Failure', props<{ error: string }>());

export const updateUser = createAction('[Admin] Update User', props<{ id: number; user: Partial<User> }>());
export const updateUserSuccess = createAction('[Admin] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Admin] Update User Failure', props<{ error: string }>());

export const deleteUser = createAction('[Admin] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[Admin] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[Admin] Delete User Failure', props<{ error: string }>());

export const toggleUserStatus = createAction('[Admin] Toggle User Status', props<{ userId: number }>());

// Permissions Management
export const updateRolePermissions = createAction(
    '[Admin] Update Role Permissions',
    props<{ roleId: number; permissions: number[] }>()
);

export const updateRolePermissionsSuccess = createAction(
    '[Admin] Update Role Permissions Success',
    props<{ roleId: number; permissions: number[] }>()
);

export const updateRolePermissionsFailure = createAction(
    '[Admin] Update Role Permissions Failure',
    props<{ error: string }>()
);

// Analytics
export const updateAnalyticsData = createAction(
    '[Admin] Update Analytics Data',
    props<{ analyticsData: AnalyticsData }>()
);

