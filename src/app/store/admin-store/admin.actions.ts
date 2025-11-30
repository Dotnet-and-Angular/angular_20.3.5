import { createAction, props } from '@ngrx/store';
import { User, Permission, Role, AnalyticsData, ChartData, Admin } from '@interfaces';

export enum ADMIN_ACTIONS {
    // Load Admin Data
    loadAdminData = 'Load Admin Data Action',
    loadAdminDataSuccess = 'Load Admin Data Success Action',
    loadAdminDataFailure = 'Load Admin Data Failure Action',

    // Admin Management
    loadAdmins = 'Load Admins Action',
    loadAdminsSuccess = 'Load Admins Success Action',
    loadAdminsFailure = 'Load Admins Failure Action',

    searchAdmins = 'Search Admins Action',
    searchAdminsSuccess = 'Search Admins Success Action',
    searchAdminsFailure = 'Search Admins Failure Action',

    registerAdmin = 'Register Admin Action',
    registerAdminSuccess = 'Register Admin Success Action',
    registerAdminFailure = 'Register Admin Failure Action',

    updateAdmin = 'Update Admin Action',
    updateAdminSuccess = 'Update Admin Success Action',
    updateAdminFailure = 'Update Admin Failure Action',

    deleteAdmin = 'Delete Admin Action',
    deleteAdminSuccess = 'Delete Admin Success Action',
    deleteAdminFailure = 'Delete Admin Failure Action',

    // User Management
    loadUsers = 'Load Users Action',
    loadUsersSuccess = 'Load Users Success Action',
    loadUsersFailure = 'Load Users Failure Action',

    searchUsers = 'Search Users Action',
    searchUsersSuccess = 'Search Users Success Action',
    searchUsersFailure = 'Search Users Failure Action',

    registerUser = 'Register User Action',
    registerUserSuccess = 'Register User Success Action',
    registerUserFailure = 'Register User Failure Action',

    updateUser = 'Update User Action',
    updateUserSuccess = 'Update User Success Action',
    updateUserFailure = 'Update User Failure Action',

    deleteUser = 'Delete User Action',
    deleteUserSuccess = 'Delete User Success Action',
    deleteUserFailure = 'Delete User Failure Action',

    toggleUserStatus = 'Toggle User Status Action',

    // Permissions Management
    updateRolePermissions = 'Update Role Permissions Action',
    updateRolePermissionsSuccess = 'Update Role Permissions Success Action',
    updateRolePermissionsFailure = 'Update Role Permissions Failure Action',

    // Analytics
    updateAnalyticsData = 'Update Analytics Data Action',
}

// Load Admin Data
export const loadAdminData = createAction(ADMIN_ACTIONS.loadAdminData);
export const loadAdminDataSuccess = createAction(
    ADMIN_ACTIONS.loadAdminDataSuccess,
    props<{
        users: User[];
        permissions: Permission[];
        roles: Role[];
        analyticsData: AnalyticsData;
        userActivityData: ChartData[];
        roleDistribution: ChartData[];
    }>()
);
export const loadAdminDataFailure = createAction(
    ADMIN_ACTIONS.loadAdminDataFailure,
    props<{ error: string }>()
);

// Admin Management
export const loadAdmins = createAction(ADMIN_ACTIONS.loadAdmins);
export const loadAdminsSuccess = createAction(
    ADMIN_ACTIONS.loadAdminsSuccess,
    props<{ admins: Admin[] }>()
);
export const loadAdminsFailure = createAction(
    ADMIN_ACTIONS.loadAdminsFailure,
    props<{ error: string }>()
);

export const searchAdmins = createAction(ADMIN_ACTIONS.searchAdmins, props<{ username: string }>());
export const searchAdminsSuccess = createAction(
    ADMIN_ACTIONS.searchAdminsSuccess,
    props<{ admins: Admin[] }>()
);
export const searchAdminsFailure = createAction(
    ADMIN_ACTIONS.searchAdminsFailure,
    props<{ error: string }>()
);

export const registerAdmin = createAction(ADMIN_ACTIONS.registerAdmin, props<{ admin: Admin }>());
export const registerAdminSuccess = createAction(
    ADMIN_ACTIONS.registerAdminSuccess,
    props<{ admin: Admin }>()
);
export const registerAdminFailure = createAction(
    ADMIN_ACTIONS.registerAdminFailure,
    props<{ error: string }>()
);

export const updateAdmin = createAction(
    ADMIN_ACTIONS.updateAdmin,
    props<{ id: number; admin: Admin }>()
);
export const updateAdminSuccess = createAction(
    ADMIN_ACTIONS.updateAdminSuccess,
    props<{ admin: Admin }>()
);
export const updateAdminFailure = createAction(
    ADMIN_ACTIONS.updateAdminFailure,
    props<{ error: string }>()
);

export const deleteAdmin = createAction(ADMIN_ACTIONS.deleteAdmin, props<{ id: number }>());
export const deleteAdminSuccess = createAction(
    ADMIN_ACTIONS.deleteAdminSuccess,
    props<{ id: number }>()
);
export const deleteAdminFailure = createAction(
    ADMIN_ACTIONS.deleteAdminFailure,
    props<{ error: string }>()
);

// User Management
export const loadUsers = createAction(ADMIN_ACTIONS.loadUsers);
export const loadUsersSuccess = createAction(
    ADMIN_ACTIONS.loadUsersSuccess,
    props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
    ADMIN_ACTIONS.loadUsersFailure,
    props<{ error: string }>()
);

export const searchUsers = createAction(ADMIN_ACTIONS.searchUsers, props<{ username: string }>());
export const searchUsersSuccess = createAction(
    ADMIN_ACTIONS.searchUsersSuccess,
    props<{ users: User[] }>()
);
export const searchUsersFailure = createAction(
    ADMIN_ACTIONS.searchUsersFailure,
    props<{ error: string }>()
);

export const registerUser = createAction(
    ADMIN_ACTIONS.registerUser,
    props<{ user: Partial<User> }>()
);
export const registerUserSuccess = createAction(
    ADMIN_ACTIONS.registerUserSuccess,
    props<{ user: User }>()
);
export const registerUserFailure = createAction(
    ADMIN_ACTIONS.registerUserFailure,
    props<{ error: string }>()
);

export const updateUser = createAction(
    ADMIN_ACTIONS.updateUser,
    props<{ id: number; user: Partial<User> }>()
);
export const updateUserSuccess = createAction(
    ADMIN_ACTIONS.updateUserSuccess,
    props<{ user: User }>()
);
export const updateUserFailure = createAction(
    ADMIN_ACTIONS.updateUserFailure,
    props<{ error: string }>()
);

export const deleteUser = createAction(ADMIN_ACTIONS.deleteUser, props<{ userId: number }>());
export const deleteUserSuccess = createAction(
    ADMIN_ACTIONS.deleteUserSuccess,
    props<{ userId: number }>()
);
export const deleteUserFailure = createAction(
    ADMIN_ACTIONS.deleteUserFailure,
    props<{ error: string }>()
);

export const toggleUserStatus = createAction(
    ADMIN_ACTIONS.toggleUserStatus,
    props<{ userId: number }>()
);

// Permissions Management
export const updateRolePermissions = createAction(
    ADMIN_ACTIONS.updateRolePermissions,
    props<{ roleId: number; permissions: number[] }>()
);
export const updateRolePermissionsSuccess = createAction(
    ADMIN_ACTIONS.updateRolePermissionsSuccess,
    props<{ roleId: number; permissions: number[] }>()
);
export const updateRolePermissionsFailure = createAction(
    ADMIN_ACTIONS.updateRolePermissionsFailure,
    props<{ error: string }>()
);

// Analytics
export const updateAnalyticsData = createAction(
    ADMIN_ACTIONS.updateAnalyticsData,
    props<{ analyticsData: AnalyticsData }>()
);
