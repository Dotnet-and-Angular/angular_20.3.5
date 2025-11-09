import { Routes } from '@angular/router';
import { Register } from './components/user/register/register';
import { Login } from './components/user/login/login';
import { Dashboard } from './components/user/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { About } from './components/core/about/about';
import { Main } from './components/core/main/main';
import { Userdata } from './components/user/userdata/userdata';

export const routes: Routes = [
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
            { path: 'user-data', component: Userdata }
        ]
    },
];
