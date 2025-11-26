import { createReducer, on } from '@ngrx/store';
import { initialAdminState } from './admin.state';
import * as AdminActions from './admin.actions';

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

    // User Management
    on(AdminActions.addUser, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),

    on(AdminActions.updateUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u)
    })),

    on(AdminActions.deleteUser, (state, { userId }) => ({
        ...state,
        users: state.users.filter(u => u.id !== userId)
    })),

    on(AdminActions.toggleUserStatus, (state, { userId }) => ({
        ...state,
        users: state.users.map(u =>
            u.id === userId
                ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
                : u
        )
    })),

    // Permissions Management
    on(AdminActions.updateRolePermissions, (state, { roleId, permissions }) => ({
        ...state,
        roles: state.roles.map(r =>
            r.id === roleId ? { ...r, permissions } : r
        )
    })),

    // Analytics
    on(AdminActions.updateAnalyticsData, (state, { analyticsData }) => ({
        ...state,
        analyticsData
    }))
);
