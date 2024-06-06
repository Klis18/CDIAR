import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaHoraria } from '../interfaces/cargaHoraria.interface';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.component.html',
})
export class CargaHorariaComponent implements OnInit {
  cargaHorariaForm: FormGroup;
  diasSemana: { label: string; value: number }[] = [];

  constructor(private docenteService: DocenteService, private fb: FormBuilder) {
    this.cargaHorariaForm = this.fb.group({
      cargaHoraria: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadDiasSemana();
  }

  get cargaHorariaArray(): FormArray {
    return this.cargaHorariaForm.get('cargaHoraria') as FormArray;
  }

  addCargaHoraria(): void {
    const cargaHorariaGroup = this.fb.group({
      diaSemana: ['', Validators.required],
      actividad: ['', Validators.required],
      horaDesde: ['', Validators.required],
      horaHasta: ['', Validators.required],
    });
    this.cargaHorariaArray.push(cargaHorariaGroup);
  }

  removeCargaHoraria(index: number): void {
    this.cargaHorariaArray.removeAt(index);
  }

  loadDiasSemana(): void {
    this.docenteService.getDiasSemana().subscribe((res: any) => {
      this.diasSemana = res.data.map((dia: any) => ({
        label: dia.nombre,
        value: dia.idDiaSemana,
      }));
    });
  }

  onSubmit(): void {
    if (this.cargaHorariaForm.valid) {
      const cargaHorariaList: CargaHoraria[] =
        this.cargaHorariaForm.value.cargaHoraria;

      const payload = {
        cargaHoraria: cargaHorariaList,
      };

      this.docenteService.createCargaHoraria(payload).subscribe();
    }
  }
}
