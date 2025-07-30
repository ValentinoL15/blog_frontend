import { Routes } from '@angular/router';
import { LoginComponent } from './public/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, 
    { path: 'login', component: LoginComponent  },
    { path: 'home', loadComponent: () => import('./private/features/home/home/home.component').then(m => m.HomeComponent) },
    { path: 'register', loadComponent: () => import('./public/auth/register/register.component').then(m => m.RegisterComponent) },
];
