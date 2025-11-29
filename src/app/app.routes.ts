import { Routes } from '@angular/router';
import { Register } from './components/user/register/register';
import { Login } from './components/user/login/login';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { About } from './components/core/about/about';
import { Main } from './components/core/main/main';

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
