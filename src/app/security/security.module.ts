import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AprobarDocenteComponent } from './components/aprobar-docente/aprobar-docente.component';

@NgModule({
  declarations: [AprobarDocenteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AprobarDocenteComponent],
})
export class SecurityModule {}
