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


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
    AcademicResourcesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    AcademicResourcesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
