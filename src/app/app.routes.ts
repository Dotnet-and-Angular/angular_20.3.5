import { Routes } from '@angular/router';
import { Register } from './components/user/register/register';
import { Login } from './components/user/login/login';
import { Dashboard } from './components/user/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { About } from './components/core/about/about';
import { Main } from './components/core/main/main';

export const routes: Routes = [
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    {
        path: '',
        component: Main,
        children: [
            { path: 'about', component: About },
            { path: 'register', component: Register },
            { path: 'login', component: Login },
            { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] }
        ]
    }
];
