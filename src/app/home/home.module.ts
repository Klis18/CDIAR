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

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
    AcademicResourcesComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DocentesComponent,
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
  ],
})
export class HomeModule {}
