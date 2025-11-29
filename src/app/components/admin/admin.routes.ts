import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { AdminDashboardComponent } from './dashboard/admin-dashboard';
import { UserManagementComponent } from './users/user-management';
import { PermissionsComponent } from './permissions/permissions';
import { AdminAnalyticsComponent } from './analytics/admin-analytics';
import { AdminManagementComponent } from './admin-management/admin-management';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayout,
        children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'users', component: UserManagementComponent },
            { path: 'permissions', component: PermissionsComponent },
            { path: 'analytics', component: AdminAnalyticsComponent },
            { path: 'admins', component: AdminManagementComponent }
        ]
    }
];
