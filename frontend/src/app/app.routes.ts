import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'index',
        loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'administration',
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'memberlist',
        loadComponent: () => import('./pages/memberlist/memberlist.component').then(m => m.MemberlistComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'forum',
        loadComponent: () => import('./pages/forum/forum.component').then(m => m.ForumComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'forum/categorie/:id',
        loadComponent: () => import('./pages/single-categorie/single-categorie.component').then(m => m.SingleCategorieComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'forum/subject/:id',
        loadComponent: () => import('./pages/single-subject/single-subject.component').then(m => m.SingleSubjectComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'forum/new',
        loadComponent: () => import('./pages/new-subject/new-subject.component').then(m => m.NewSubjectComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/no-page/no-page.component').then(m => m.NoPageComponent)
    }
];
