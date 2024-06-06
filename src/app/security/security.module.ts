import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprobarDocenteComponent } from './components/aprobar-docente/aprobar-docente.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CargaHorariaTableComponent } from './components/carga-horaria-table/carga-horaria-table.component';
import { DocenteTableComponent } from './components/docente-table/docente-table.component';

@NgModule({
  declarations: [AprobarDocenteComponent, CargaHorariaTableComponent, DocenteTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SecurityModule {}
