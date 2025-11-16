import { Routes } from '@angular/router';
import { Register } from './components/user/register/register';
import { Login } from './components/user/login/login';
import { Dashboard } from './components/user/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { About } from './components/core/about/about';
import { Main } from './components/core/main/main';
import { Userdata } from './components/user/userdata/userdata';
import { SettingsComponent } from './components/user/settings/settings-main/settings';
import { AccountSettingsComponent } from './components/user/settings/account-settings/account-settings';
import { PrivacySettingsComponent } from './components/user/settings/privacy-settings/privacy-settings';
import { NotificationSettingsComponent } from './components/user/settings/notification-settings/notification-settings';
import { ProfileComponent } from './components/user/profile/profile-main/profile';
import { ViewProfileComponent } from './components/user/profile/view-profile/view-profile';
import { EditProfileComponent } from './components/user/profile/edit-profile/edit-profile';
import { AnalyticsComponent } from './components/user/analytics/analytics';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: Main,
        children: [
            { path: 'about', component: About },
            { path: 'register', component: Register },
            { path: 'login', component: Login },
        ]
    },
    {
        path: 'user', component: Dashboard, canActivate: [AuthGuard],
        children: [
            { path: 'user-data', component: Userdata },
            {
                path: 'settings', component: SettingsComponent,
                children: [
                    { path: 'account', component: AccountSettingsComponent },
                    { path: 'privacy', component: PrivacySettingsComponent },
                    { path: 'notifications', component: NotificationSettingsComponent },
                    { path: '', redirectTo: 'account', pathMatch: 'full' }
                ]
            },
            {
                path: 'profile', component: ProfileComponent,
                children: [
                    { path: 'view', component: ViewProfileComponent },
                    { path: 'edit', component: EditProfileComponent },
                    { path: '', redirectTo: 'view', pathMatch: 'full' }
                ]
            },
            { path: 'analytics', component: AnalyticsComponent }
        ]
    },
];
