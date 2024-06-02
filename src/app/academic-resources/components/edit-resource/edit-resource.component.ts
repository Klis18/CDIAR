import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Nivel } from '../../interfaces/nivel.inteface';
import { Recurso, RecursoEdit } from '../../interfaces/recurso.interface';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styles: ``,
})
export class EditResourceComponent {
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];
  recursoFile: string | null = null;
  extension: string = '';
  datosRecursos!: any;
  editaDataRecurso!: any;
  idRecurso!: number;
  validForm: boolean = true;

  constructor(
    private recursoService: RecursoService,
    public dialogRef: MatDialogRef<EditResourceComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getRecurso(this.data);
    console.log(this.data);
  }

  getRecurso(idRecurso: number) {
    console.log('RECURSO ID: ', idRecurso);

    this.recursoService.getRecurso(idRecurso).subscribe((res: any) => {
      console.log(res);
      this.datosRecursos = res.data;
    });
  }

  saveRecurso() {
    if (this.validForm) {
      console.log('Debe completar todos los campos para continuar.');
      return;
    }

    const recursosedit: RecursoEdit = {
      idRecurso: this.editaDataRecurso.idRecurso,
      idNivel: this.editaDataRecurso.idNivel,
      idAsignatura: this.editaDataRecurso.idAsignatura,
      idEstado: this.editaDataRecurso.idEstado,
      tipoRecurso: this.editaDataRecurso.tipoRecurso,
      enlaceDelRecurso: this.editaDataRecurso.enlaceDelRecurso,
      nombreRecurso: this.editaDataRecurso.nombreRecurso,
      nombreRevisor: this.editaDataRecurso.nombreRevisor,
      observaciones: this.editaDataRecurso.observaciones,
    };

    debugger;

    this.recursoService.editarRecurso(recursosedit).subscribe((res) => {
      console.log('recurso editado');
    });
  }

  getData(events: any) {
    this.editaDataRecurso = events;
  }

  getValidForm(event: any) {
    this.validForm = event;
  }
}
