import { Routes } from '@angular/router';
import {
    AdminLayout, AdminDashboardComponent, UserManagementComponent,
    PermissionsComponent, AdminAnalyticsComponent, AdminManagementComponent
} from "@admin/components";
import { EditProfileComponent, ViewProfileComponent, ProfileComponent } from "@user/components";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayout,
        children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'users', component: UserManagementComponent },
            { path: 'permissions', component: PermissionsComponent },
            { path: 'analytics', component: AdminAnalyticsComponent },
            { path: 'admins', component: AdminManagementComponent },
            {
                path: 'profile',
                component: ProfileComponent,
                children: [
                    { path: 'view', component: ViewProfileComponent },
                    { path: 'edit', component: EditProfileComponent },
                    { path: '', redirectTo: 'view', pathMatch: 'full' }
                ]
            }
        ]
    }
];
