import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.interface';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

// Users Selectors
export const selectAllUsers = createSelector(
    selectAdminState,
    (state: AdminState) => state.users
);

export const selectUserById = (userId: number) => createSelector(
    selectAllUsers,
    (users) => users.find(u => u.id === userId)
);

export const selectFilteredUsers = (searchQuery: string) => createSelector(
    selectAllUsers,
    (users) => users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
);

// Permissions Selectors
export const selectAllPermissions = createSelector(
    selectAdminState,
    (state: AdminState) => state.permissions
);

export const selectAllRoles = createSelector(
    selectAdminState,
    (state: AdminState) => state.roles
);

export const selectRoleById = (roleId: number) => createSelector(
    selectAllRoles,
    (roles) => roles.find(r => r.id === roleId)
);

export const selectPermissionsByCategory = (category: string) => createSelector(
    selectAllPermissions,
    (permissions) => permissions.filter(p => p.category === category)
);

// Analytics Selectors
export const selectAnalyticsData = createSelector(
    selectAdminState,
    (state: AdminState) => state.analyticsData
);

export const selectUserActivityData = createSelector(
    selectAdminState,
    (state: AdminState) => state.userActivityData
);

export const selectRoleDistribution = createSelector(
    selectAdminState,
    (state: AdminState) => state.roleDistribution
);

// Loading & Error Selectors
export const selectAdminLoading = createSelector(
    selectAdminState,
    (state: AdminState) => state.loading
);

export const selectAdminError = createSelector(
    selectAdminState,
    (state: AdminState) => state.error
);
