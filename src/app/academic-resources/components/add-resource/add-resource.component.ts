import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { RecursoService } from '../services/recurso.service';
import { Nivel } from '../../interfaces/nivel.inteface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recurso } from '../../interfaces/recurso.interface';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResourcesTableComponent } from '../resources-table/resources-table.component';

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
  recursoFile: string | null = null;
  extension: string = '';
  listadoExtensionesImagenes = ['jpg', 'jpeg', 'png'];
  listadoExtensionesArchivos = [
    'docx',
    'pdf',
    'pptx',
    'xlsx',
    'txt',
    'doc',
    'ppt',
    'xls',
    'csv',
  ];

  constructor(
    private recursoService: RecursoService,
    public dialogRef: MatDialogRef<AddResourceComponent>
  ) {}

  public recursoGroupForm = new FormGroup({
    idNivel: new FormControl(0, Validators.required),
    idAsignatura: new FormControl(0, Validators.required),
    tipoRecurso: new FormControl<string>('', Validators.required),
    link: new FormControl<string>(''),
    nombreRecurso: new FormControl<string>('', Validators.required),
    tipoArchivo: new FormControl<string>('', Validators.required),
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
        this.extension = file.name.split('.').pop() || '';
        debugger;
        if (
          !this.listadoExtensionesImagenes.includes(this.extension) &&
          this.recursoGroupForm.value.tipoArchivo === 'Imagen'
        ) {
          //enviar mensaje error de que la extension no es permitida para imagenes
          window.alert('La extensión del archivo no es permitida');
          this.recursoFile = null;
        } else if (
          !this.listadoExtensionesArchivos.includes(this.extension) &&
          this.recursoGroupForm.value.tipoArchivo === 'Documento'
        ) {
          //enviar mensaje error de que la extension no es permitida para archivos
          window.alert('La extensión del archivo no es permitida');
          this.recursoFile = null;
        }
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
    const selectedNivel = Number((event.target as HTMLSelectElement).value);
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

  isLink() {
    return this.recursoGroupForm.value.tipoRecurso === 'Link';
  }
  isFile() {
    return this.recursoGroupForm.value.tipoRecurso === 'Archivo';
  }
  onSubmit() {
    if (this.recursoGroupForm.invalid)
      return console.log(this.recursoGroupForm.value);
    if (this.recursoFile === null) {
      this.recursoFile = null;
    }

    const recursosForm = this.getCurrenResource();

    if (recursosForm.link === '') {
      recursosForm.link = null;
    }

    if (this.listadoExtensionesImagenes.includes(this.extension)) {
      recursosForm.tipoRecurso = 'Imagen';
    } else if (this.listadoExtensionesArchivos.includes(this.extension)) {
      recursosForm.tipoRecurso = 'Archivo';
    } else if (recursosForm.link !== null) {
      recursosForm.tipoRecurso = 'Link';
    }

    const resource: Recurso = {
      ...recursosForm,
      recurso: this.recursoFile,
      extension: this.extension,
    };

    this.recursoService.addRecurso(resource).subscribe((res) => {
      console.log('recurso agregado');
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
