import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprobarDocenteComponent } from './components/aprobar-docente/aprobar-docente.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AprobarDocenteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SecurityModule {}
