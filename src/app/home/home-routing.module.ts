import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AcademicResourcesComponent } from './pages/academic-resources/academic-resources.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { SecurityComponent } from './pages/security/security.component';
import { AprobarDocenteComponent } from '../security/components/aprobar-docente/aprobar-docente.component';
import { AsignarRevisorComponent } from './pages/asignar-revisor/asignar-revisor.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'landing', component: HomeComponent },
      { path: 'resources', component: AcademicResourcesComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'aprobacion-docente', component: AprobarDocenteComponent},
      {path: 'asignacion-revisor', component: AsignarRevisorComponent},
      { path: 'docentes', component: DocentesComponent },
      { path: '**', redirectTo: 'landing' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
