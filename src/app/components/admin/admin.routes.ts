import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard';
import { UserManagementComponent } from './users/user-management';
import { PermissionsComponent } from './permissions/permissions';
import { AdminAnalyticsComponent } from './analytics/admin-analytics';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        children: [
            { path: 'users', component: UserManagementComponent },
            { path: 'permissions', component: PermissionsComponent },
            { path: 'analytics', component: AdminAnalyticsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
