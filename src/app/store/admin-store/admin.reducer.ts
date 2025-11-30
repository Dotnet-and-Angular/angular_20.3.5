import { createReducer, on } from '@ngrx/store';
import { initialAdminState } from './admin.state';
import * as AdminActions from './admin.actions';

interface Admin {
    id?: number;
    username: string;
    email: string;
    role: 'admin' | 'user' | 'editor' | 'viewer';
    status?: 'active' | 'inactive';
    joinDate?: string;
}

export const adminReducer = createReducer(
    initialAdminState,

    // Load Admin Data
    on(AdminActions.loadAdminData, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AdminActions.loadAdminDataSuccess, (state, { users, permissions, roles, analyticsData, userActivityData, roleDistribution }) => ({
        ...state,
        users,
        permissions,
        roles,
        analyticsData,
        userActivityData,
        roleDistribution,
        loading: false,
        error: null
    })),

    on(AdminActions.loadAdminDataFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Admin Management
    on(AdminActions.loadAdmins, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AdminActions.loadAdminsSuccess, (state, { admins }) => ({
        ...state,
        admins,
        loading: false,
        error: null
    })),

    on(AdminActions.loadAdminsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.searchAdminsSuccess, (state, { admins }) => ({
        ...state,
        admins,
        loading: false,
        error: null
    })),

    on(AdminActions.searchAdminsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.registerAdminSuccess, (state, { admin }) => ({
        ...state,
        admins: [...state.admins, admin],
        loading: false,
        error: null
    })),

    on(AdminActions.registerAdminFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.updateAdminSuccess, (state, { admin }) => ({
        ...state,
        admins: state.admins.map(a => a.id === admin.id ? admin : a),
        loading: false,
        error: null
    })),

    on(AdminActions.updateAdminFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.deleteAdminSuccess, (state, { id }) => ({
        ...state,
        admins: state.admins.filter(a => a.id !== id),
        loading: false,
        error: null
    })),

    on(AdminActions.deleteAdminFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // User Management
    on(AdminActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AdminActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        error: null
    })),

    on(AdminActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.searchUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        error: null
    })),

    on(AdminActions.searchUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.registerUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        loading: false,
        error: null
    })),

    on(AdminActions.registerUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u),
        loading: false,
        error: null
    })),

    on(AdminActions.updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(AdminActions.deleteUserSuccess, (state, { userId }) => ({
        ...state,
        users: state.users.filter(u => u.id !== userId),
        loading: false,
        error: null
    })),

    on(AdminActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Permissions Management
    on(AdminActions.updateRolePermissions, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AdminActions.updateRolePermissionsSuccess, (state, { roleId, permissions }) => ({
        ...state,
        roles: state.roles.map(r =>
            r.id === roleId ? { ...r, permissions } : r
        ),
        loading: false,
        error: null
    })),

    on(AdminActions.updateRolePermissionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Analytics
    on(AdminActions.updateAnalyticsData, (state, { analyticsData }) => ({
        ...state,
        analyticsData
    }))
);

