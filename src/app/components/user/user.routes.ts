import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AnalyticsComponent } from "./analytics/analytics";
import { UserDashboard } from "./dashboard/user-dashboard";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile";
import { ProfileComponent } from "./profile/profile-main/profile";
import { ViewProfileComponent } from "./profile/view-profile/view-profile";
import { AccountSettingsComponent } from "./settings/account-settings/account-settings";
import { NotificationSettingsComponent } from "./settings/notification-settings/notification-settings";
import { PrivacySettingsComponent } from "./settings/privacy-settings/privacy-settings";
import { SettingsComponent } from "./settings/settings-main/settings";
import { Userdata } from "./userdata/userdata";


export const USER_ROUTES: Routes = [
    {
        path: '', component: UserDashboard, canActivate: [AuthGuard],
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
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            { path: '', redirectTo: 'user-data', pathMatch: 'full' }
        ]
    },
];