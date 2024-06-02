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

  recursoGroupForm!: FormGroup;
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];
  recursoFile: string | null = null;
  extension: string = '';
  datosRecursos!: any;
  state: boolean = false;

  constructor(
    private fb: FormBuilder,
    private recursoService: RecursoService
  ) {}

  ngOnInit() {
    console.log(this.formData);

    this.loadNiveles();
    this.loadEstados();
    this.recursoGroupForm.valueChanges.subscribe(() => {
      this.editedDataEmitter.emit(this.recursoGroupForm.value);
      this.valueFormEmitter.emit(this.recursoGroupForm.valid);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      if (!this.recursoGroupForm) {
        this.createForm();
      }
      this.state = true;
      this.datosRecursos = changes['formData'].currentValue;
      this.setData(this.datosRecursos);
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
      nombreRevisor: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

  setData(data: any) {
    console.log('ddata dasdasdasd', data);

    if (data && this.recursoGroupForm) {
      console.log('hola mundo', this.recursoGroupForm.value);

      this.recursoGroupForm.get('idRecurso')?.setValue(data?.idRecurso);
      this.recursoGroupForm.get('idNivel')?.setValue(data.idNivel);
      this.getAsignaturasPorNivel(Number( data.idNivel), () => {
        this.recursoGroupForm.get('idAsignatura')?.setValue(data.idAsignatura);
      });
      this.recursoGroupForm.get('idEstado')?.setValue(data.idEstado);
      this.recursoGroupForm.get('tipoRecurso')?.setValue(data.tipoRecurso);
      this.recursoGroupForm
        .get('enlaceDelRecurso')
        ?.setValue(data.enlaceDelRecurso);
      this.recursoGroupForm.get('nombreRecurso')?.setValue(data.nombreRecurso);
      this.recursoGroupForm.get('nombreRevisor')?.setValue(data.nombreRevisor);
      this.recursoGroupForm.get('observaciones')?.setValue(data.observaciones);

      console.log(this.nameFile);
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
    this.getAsignaturasPorNivel(selectedNivel);
  }

  getAsignaturasPorNivel(idNivel: number, callback?: () => void) {
    this.recursoService
      .getAsignaturasPorNivel(idNivel)
      .subscribe((res: any) => {
        this.asignaturas = res.data.map((asignatura: any) => ({
          label: asignatura.nombre,
          value: asignatura.idAsignatura,
        }));
        if (callback) {
          callback();
        }
      });
  }

  nameFile!: File;
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.recursoFile = (reader.result as string).split(',')[1];
        this.extension = file.name.split('.').pop() || '';
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
    const resultName = value.split('/').slice(-1)[0];
    return resultName || '';
  }
}
