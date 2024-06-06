import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path:'academic-resources',
    loadChildren: () => import('./academic-resources/academic-resources.module').then(m => m.AcademicResourcesModule),
  },
  {path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)},
  {path: 'docentes', loadChildren: () => import('./docente/docente.module').then(m => m.DocenteModule)},
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
