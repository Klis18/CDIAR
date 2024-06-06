import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.component.html',
})
export class CargaHorariaComponent{

  // diasSemana: { label: string; value: string }[] = [];
  // cargaHorariaGroup: FormGroup;

  // ngOnInit(): void {
  //   this.loadDiasSemana();
  // }

  // constructor(private docenteService: DocenteService, private fb: FormBuilder) {
  //   this.cargaHorariaGroup = this.fb.group({
  //     cargasHorarias: this.fb.array([]),
  //   });
  // }

  // get cargasHorarias(): FormArray {
  //   return this.cargaHorariaGroup.get('cargasHorarias') as FormArray;
  // }

  // eliminarCargaHoraria(index: number) {
  //   this.cargasHorarias.removeAt(index);
  // }

  // agregarCargaHoraria() {
  //   const cargaHorariaForm = this.fb.group({
  //     idDocente: ['', Validators.required],
  //     diaSemana: ['', Validators.required],
  //     actividad: ['', Validators.required],
  //     horaDesde: ['', Validators.required],
  //     horaHasta: ['', Validators.required],
  //   });
  //   this.cargasHorarias.push(cargaHorariaForm);
  // }

  // loadDiasSemana() {
  //   this.docenteService.getDiasSemana().subscribe((res: any) => {
  //     this.diasSemana = res.data.map((dia: any) => ({
  //       label: dia.nombre,
  //       value: dia.idDiaSemana,
  //     }));
  //   });
  // }

  // onSubmit() {
  //   console.log('Submit');
  // }
}
