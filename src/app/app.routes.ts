import { Routes } from '@angular/router';
import { LoginComponent } from './public/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, 
    { path: 'login', component: LoginComponent  },
    { path: 'home', loadComponent: () => import('./private/features/home/home.component').then(m => m.HomeComponent) },
    { path: 'register', loadComponent: () => import('./public/auth/register/register.component').then(m => m.RegisterComponent) },
    { path: 'blogs/:etiqueta', loadComponent: () => import('./private/features/blogs/blogs.component').then(m => m.BlogsComponent) },
    { path: 'myBlogs', loadComponent: () => import('./private/features/my-blog/my-blog.component').then(m => m.MyBlogComponent) },
    { path: 'crear', loadComponent: () => import('./private/features/crear-blog/crear-blog.component').then(m => m.CrearBlogComponent) },
    { path: 'editar/:id', loadComponent: () => import('./private/features/crear-blog/crear-blog.component').then(m => m.CrearBlogComponent) },
    
];
