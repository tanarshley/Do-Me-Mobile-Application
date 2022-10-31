import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alerts',
    loadChildren: () => import('./alerts/alerts.module').then( m => m.AlertsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recents',
    loadChildren: () => import('./recents/recents.module').then( m => m.RecentsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-do-modal',
    loadChildren: () => import('./create-do-modal/create-do-modal.module').then( m => m.CreateDoModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-information',
    loadChildren: () => import('./edit-information/edit-information.module').then( m => m.EditInformationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-do-modal',
    loadChildren: () => import('./edit-do-modal/edit-do-modal.module').then( m => m.EditDoModalPageModule)
  },
  {
    path: 'view-recent',
    loadChildren: () => import('./view-recent/view-recent.module').then( m => m.ViewRecentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
