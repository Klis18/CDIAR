import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecursoService } from '../services/recurso.service';
import { Nivel } from '../../interfaces/nivel.inteface';
import { Recurso } from '../../interfaces/recurso.interface';

@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styles: ``,
})
export class ResourcesFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Output() editedDataEmitter = new EventEmitter<any>();
  @Output() valueFormEmitter = new EventEmitter<boolean>();
  @Output() asignaturaEmitter = new EventEmitter<any>();

  recursoGroupForm!: FormGroup;
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];
  docentes: { label: string; value: string }[] = [];
  recursoFile: string | null = null;
  extension: string = '';
  datosRecursos!: any;
  state: boolean = false;
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
    private fb: FormBuilder,
    private recursoService: RecursoService
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadNiveles();
    this.loadEstados();
    this.loadDocentes();

    if (this.formData) {
      this.setData(this.formData);
    }

    this.recursoGroupForm.valueChanges.subscribe(() => {
      console.log(this.recursoGroupForm.value);

      this.editedDataEmitter.emit(this.recursoGroupForm.value);
      this.valueFormEmitter.emit(this.recursoGroupForm.valid);
      this.asignaturaEmitter.emit(this.recursoGroupForm.value.idAsignatura);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && !changes['formData'].firstChange) {
      this.setData(changes['formData'].currentValue);
    }
  }

  createForm() {
    this.recursoGroupForm = this.fb.group({
      idRecurso: [],
      idNivel: [0, Validators.required],
      idAsignatura: [0, Validators.required],
      idEstado: [0, Validators.required],
      tipoRecurso: ['', Validators.required],
      enlaceDelRecurso: ['', Validators.required],
      nombreRecurso: ['', Validators.required],
      idDocenteRevisor: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

  setData(data: any) {
    if (data && this.recursoGroupForm) {
      this.recursoGroupForm.patchValue({
        idRecurso: data.idRecurso,
        idNivel: data.idNivel,
        idAsignatura: data.idAsignatura,
        idEstado: data.idEstado,
        tipoRecurso: data.tipoRecurso,
        enlaceDelRecurso: data.enlaceDelRecurso,
        nombreRecurso: data.nombreRecurso,
        nombreRevisor: data.nombreRevisor,
        observaciones: data.observaciones,
      });

      this.getAsignaturasPorNivel(Number(data.idNivel));
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

  loadDocentes() {
    this.recursoService.getDocentes().subscribe((res: any) => {
      console.log('docentes', res.data);
      this.docentes = res.data.map((docente: any) => ({
        label: docente.nombresCompletos,
        value: docente.idDocente,
      }));
    });
  }

  onNivelChange(event: Event) {
    const selectedNivel = Number((event.target as HTMLSelectElement).value);
    this.getAsignaturasPorNivel(selectedNivel);
  }

  getAsignaturasPorNivel(idNivel: number, callback?: () => void) {
    this.recursoService
      .getAsignaturasPorNivel(idNivel)
      .subscribe((res: any) => {
        console.log(res.data);

        this.asignaturas = res.data.map((asignatura: any) => ({
          label: asignatura.nombre,
          value: asignatura.idAsignatura,
        }));

        if (callback) {
          callback();
        }
      });
    const asignaturaControl = this.recursoGroupForm.get('idAsignatura');
    console.log(asignaturaControl);

    if (asignaturaControl) {
      asignaturaControl.markAsTouched();
      asignaturaControl.updateValueAndValidity();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      debugger;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.recursoFile = (reader.result as string).split(',')[1];
        this.extension = file.name.split('.').pop() || '';
        if (
          !this.listadoExtensionesImagenes.includes(this.extension) &&
          !this.listadoExtensionesArchivos.includes(this.extension)
        ) {
          //enviar mensaje error de que la extension no es permitida para imagenes
          window.alert('La extensión del archivo no es permitida');
        }
      };
    }
  }

  isLink() {
    return this.recursoGroupForm.value.tipoRecurso === 'Link';
  }

  isFile() {
    return this.recursoGroupForm.value.tipoRecurso === 'Archivo';
  }

  recurseName(value: string): string {
    return value.split('/').slice(-1)[0] || '';
  }
}
