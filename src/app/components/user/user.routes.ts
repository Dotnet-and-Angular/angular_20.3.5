import { Routes } from '@angular/router';
import {
    AnalyticsComponent,
    UserDashboard,
    EditProfileComponent,
    ProfileComponent,
    ViewProfileComponent,
    AccountSettingsComponent,
    Userdata,
    SettingsComponent,
    PrivacySettingsComponent,
    NotificationSettingsComponent,
} from '@user/components';

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserDashboard,
        children: [
            { path: 'user-data', component: Userdata },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    { path: 'account', component: AccountSettingsComponent },
                    { path: 'privacy', component: PrivacySettingsComponent },
                    { path: 'notifications', component: NotificationSettingsComponent },
                    { path: '', redirectTo: 'account', pathMatch: 'full' },
                ],
            },
            {
                path: 'profile',
                component: ProfileComponent,
                children: [
                    { path: 'view', component: ViewProfileComponent },
                    { path: 'edit', component: EditProfileComponent },
                    { path: '', redirectTo: 'view', pathMatch: 'full' },
                ],
            },
            {
                path: 'analytics',
                component: AnalyticsComponent,
            },
            { path: '', redirectTo: 'user-data', pathMatch: 'full' },
        ],
    },
];
