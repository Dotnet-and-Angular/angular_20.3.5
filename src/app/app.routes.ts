import { Routes } from '@angular/router';
import { Register, Login } from '@user/components';
import { AuthGuard, RoleGuard } from '@guards';
import { About, Main } from '@core/components';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: '',
        component: Main,
        children: [
            { path: '', component: About },
        ]
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' },
        loadChildren: () => import('./components/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },

    {
        path: 'user',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'user' },
        loadChildren: () => import('./components/user/user.routes').then(m => m.USER_ROUTES)
    },
];
