import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../services/recurso.service';
import { Nivel } from '../../interfaces/nivel.inteface';
import { FormGroup, Validators } from '@angular/forms';
import { Recurso } from '../../interfaces/recurso.interface';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styles: `

  `,
})
export class AddResourceComponent implements OnInit {
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];

  constructor(private recursoService: RecursoService) {}

  public recursoGroup = new FormGroup({
    nivel: new FormGroup({}, Validators.required),
    asignatura: new FormGroup({}, Validators.required),
    tipoRecurso: new FormGroup<string>('', Validators.required),
    nombreRecurso: new FormGroup<string>('', Validators.required),
    recurso: new FormGroup<string>('', Validators.required),
  });

  ngOnInit() {
    this.loadNiveles();
    this.loadEstados();
  }

  loadNiveles() {
    this.recursoService.getNiveles().subscribe((res: any) => {
      this.nivelesType = res.data.map((nivel: Nivel) => ({
        label: nivel.descripcion,
        value: nivel.idNivel,
      }));
    });
  }

  loadEstados() {
    this.recursoService.getEstados().subscribe((res: any) => {
      this.estados = res.data.map((estado: any) => ({
        label: estado.descripcion,
        value: estado.idEstado,
      }));
    });
  }

  onNivelChange(event: Event) {
    const selectedNivel = (event.target as HTMLSelectElement).value;
    this.recursoService
      .getAsignaturasPorNivel(selectedNivel)
      .subscribe((res: any) => {
        this.asignaturas = res.data.map((asignatura: any) => ({
          label: asignatura.nombre,
          value: asignatura.idAsignatura,
        }));
      });
  }

  getCurrenResource(): Recurso {
    return this.recursoGroup.value as Recurso;
  }

  onSubmit() {
    if (this.recursoGroup.invalid) return;

    const recurso = this.getCurrenResource();

    this.recursoService.addRecurso(recurso).subscribe((res) => {});
  }
}
