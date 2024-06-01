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
    //this.loadNiveles();
    //this.loadEstados();
    this.getRecurso(this.data);
    console.log(this.data);
  }

  getRecurso(idRecurso: number) {
    this.recursoService.getRecurso(idRecurso).subscribe((res: any) => {
      console.log(res);
      this.datosRecursos = res.data;
    });
  }

  saveRecurso() {
    if (this.validForm) {
      // this._snackBar.warning(
      //   'Aviso',
      //   'Debe completar todos los campos para continuar.',
      // );
      console.log('Debe completar todos los campos para continuar.');
      return;
    }

    const formData = new FormData();

    formData.append('idRecurso', this.editaDataRecurso.idRecurso);
    formData.append('idNivel', this.editaDataRecurso.idNivel);
    formData.append('idAsignatura', this.editaDataRecurso.idAsignatura);
    formData.append('idEstado', this.editaDataRecurso.idEstado);
    formData.append('tipoRecurso', this.editaDataRecurso.tipoRecurso);
    formData.append('enlaceDelRecurso', this.editaDataRecurso.enlaceDelRecurso);
    formData.append('nombreRecurso', this.editaDataRecurso.nombreRecurso);
    formData.append('nombreRevisor', this.editaDataRecurso.nombreRevisor);
    formData.append('observaciones', this.editaDataRecurso.observaciones);

    const recurso: RecursoEdit = this.formDataToJson(formData);

    recurso.idRecurso = this.data.idRecurso;

    this.recursoService.editarRecurso(recurso).subscribe((res) => {
      console.log('recurso editado');
    });
  }

  getData(events: any) {
    this.editaDataRecurso = events;
  }

  getValidForm(event: any) {
    this.validForm = event;
  }

  // public recursoGroupForm = new FormGroup({
  //   idNivel: new FormControl(0, Validators.required),
  //   idAsignatura: new FormControl(0, Validators.required),
  //   estadoRecurso: new FormControl(0, Validators.required),
  //   tipoRecurso: new FormControl<string>('', Validators.required),
  //   link: new FormControl<string>(''),
  //   nombreRecurso: new FormControl('', [Validators.required]),
  //   nombreRevisor: new FormControl<string>('', Validators.required),
  //   observaciones: new FormControl<string>(''),
  // });

  // recursoData(){
  //   this.recursoService.getRecurso(this.data).subscribe((res: any) => {
  //     console.log(res);
  //     this.datosRecursos = res.data;
  //   });
  // }

  // getAnimal(idAnimal: number) {
  //   this.animalService.getAnimalById(idAnimal).subscribe((res) => {
  //     this.animalData = res.data;
  //   });
  // }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.recursoFile = (reader.result as string).split(',')[1];
  //       this.extension = file.name.split('.').pop() || '';
  //     };
  //   }
  // }

  // loadNiveles() {
  //   this.recursoService.getNiveles().subscribe((res: any) => {
  //     this.nivelesType = res.data.map((nivel: Nivel) => ({
  //       label: nivel.descripcion,
  //       value: nivel.idNivel,
  //     }));
  //   });
  // }

  // loadEstados() {
  //   this.recursoService.getEstados().subscribe((res: any) => {
  //     this.estados = res.data.map((estado: any) => ({
  //       label: estado.descripcion,
  //       value: estado.idEstado,
  //     }));
  //   });
  // }

  // onNivelChange(event: Event) {
  //   const selectedNivel = (event.target as HTMLSelectElement).value;
  //   this.recursoService
  //     .getAsignaturasPorNivel(selectedNivel)
  //     .subscribe((res: any) => {
  //       console.log(res.data);
  //       this.asignaturas = res.data.map((asignatura: any) => ({
  //         label: asignatura.nombre,
  //         value: asignatura.idAsignatura,
  //       }));
  //     });
  // }

  getCurrenResource(): Recurso {
    return this.data as Recurso;
  }

  // isLink(){
  //   return this.recursoGroupForm.value.tipoRecurso === 'Link';
  // }
  // isFile(){
  //   return this.recursoGroupForm.value.tipoRecurso === 'Archivo';
  // }
  // onSubmit() {
  //   if (this.recursoGroupForm.invalid)
  //     return console.log(this.recursoGroupForm.value);
  //   if (this.recursoFile === null) {
  //     this.recursoFile = null;
  //   }

  //   const recursosForm = this.getCurrenResource();

  //   if (recursosForm.link === '') {
  //     recursosForm.link = null;
  //   }

  //   const resource: Recurso = {
  //     ...recursosForm,
  //     recurso: this.recursoFile,
  //     extension: this.extension,
  //   };

  //   this.recursoService.addRecurso(resource).subscribe((res) => {
  //     console.log('recurso agregado');
  //   });
  // }

  cancelar() {
    this.dialogRef.close();
  }

  formDataToJson(formData: FormData): any {
    const jsonObject: any = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return jsonObject;
  }
}
