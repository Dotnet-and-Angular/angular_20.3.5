import { Routes } from '@angular/router';
import {
    AdminLayout, AdminDashboardComponent, UserManagementComponent,
    PermissionsComponent, AdminAnalyticsComponent, AdminManagementComponent
} from "@admin/components";

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
