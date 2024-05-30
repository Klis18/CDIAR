import { Component, OnChanges, OnInit } from '@angular/core';
import { RecursoService } from '../services/recurso.service';
import { Nivel } from '../../interfaces/nivel.inteface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recurso } from '../../interfaces/recurso.interface';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styles: `

  `,
})
export class AddResourceComponent implements OnInit{
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];
  recursoFile: string | null = null;

  constructor(private recursoService: RecursoService, public dialogRef: MatDialogRef<AddResourceComponent>) {}

  public recursoGroupForm = new FormGroup({
    idNivel: new FormControl(0, Validators.required),
    idAsignatura: new FormControl(0, Validators.required),
    tipoRecurso: new FormControl<string>('', Validators.required),
    link: new FormControl<string>('', Validators.required),
    nombreRecurso: new FormControl<string>('', Validators.required),
    //recurso: new FormControl('', Validators.required),
    //estado: new FormControl<string>('', Validators.required),
  });

  ngOnInit() {
    this.loadNiveles();
    this.loadEstados();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.recursoFile = (reader.result as string).split(',')[1];
      };
    }
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
        console.log(res.data);
        this.asignaturas = res.data.map((asignatura: any) => ({
          label: asignatura.nombre,
          value: asignatura.idAsignatura,
        }));
      });
  }

  getCurrenResource(): Recurso {
   return this.recursoGroupForm.value as Recurso;
  }

  onSubmit() {
    if (this.recursoGroupForm.invalid) return;
    if (this.recursoFile === null) {
      this.recursoFile = '';
    }
    const recursosForm = this.getCurrenResource();

    const resource: Recurso = {
      ...recursosForm,
      recurso: this.recursoFile,
    };

    this.recursoService.addRecurso(resource).subscribe((res) => {
      console.log('recurso agregado');
    });
  }

  cancelar(){
    this.dialogRef.close();
  }

  pruebabtn(){
    console.log(this.recursoGroupForm.value);
  }
}
