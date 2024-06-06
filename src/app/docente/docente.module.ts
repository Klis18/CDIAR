import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaHorariaComponent } from './carga-horaria/carga-horaria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CargaHorariaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CargaHorariaComponent],
})
export class DocenteModule {}
