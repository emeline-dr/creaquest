import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { ForumComponent } from './pages/forum/forum.component';
import { NoPageComponent } from './pages/no-page/no-page.component';
import { MemberlistComponent } from './pages/memberlist/memberlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SingleCategorieComponent } from './pages/single-categorie/single-categorie.component';
import { SingleSubjectComponent } from './pages/single-subject/single-subject.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'index',
        component: IndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'administration',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'memberlist',
        component: MemberlistComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forum',
        component: ForumComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forum/categorie/:id',
        component: SingleCategorieComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forum/subject/:id',
        component: SingleSubjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NoPageComponent
    },
];
