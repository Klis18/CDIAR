import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';
import { AcademicResourcesModule } from '../academic-resources/academic-resources.module';
import { AcademicResourcesComponent } from './pages/academic-resources/academic-resources.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { DocenteModule } from '../docente/docente.module';
import { SecurityComponent } from './pages/security/security.component';
import { SecurityModule } from '../security/security.module';
import { AprobarDocentesComponent } from './pages/aprobar-docentes/aprobar-docentes.component';
import { AsignarRevisorComponent } from './pages/asignar-revisor/asignar-revisor.component';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
    AcademicResourcesComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DocentesComponent,
    SecurityComponent,
    AprobarDocentesComponent,
    AsignarRevisorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    AcademicResourcesModule,
    FormsModule,
    ReactiveFormsModule,
    DocenteModule,
    SecurityModule,
  ],
})
export class HomeModule {}
