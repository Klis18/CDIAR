import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nivel } from '../../interfaces/nivel.inteface';
import { Recurso } from '../../interfaces/recurso.interface';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styles: ``
})
export class ResourcesFormComponent implements OnInit, OnChanges{
  @Input() formData:any;
  @Output() editedDataEmitter = new EventEmitter<any>(); // To emit edited data
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
    private recursoService: RecursoService,
  ) {}
  
  ngOnInit() {
    this.createForm();
    this.loadNiveles();
    this.loadEstados(); 
    this.recursoGroupForm.valueChanges.subscribe((value) => {
      this.editedDataEmitter.emit(this.recursoGroupForm.value);
      this.valueFormEmitter.emit(this.recursoGroupForm.valid);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      this.state = true
      this.datosRecursos = changes['formData'].currentValue;
      this.setData(this.datosRecursos);

    }  }

  createForm() {
    this.recursoGroupForm = this.fb.group({
      idNivel: [0, Validators.required],
      idAsignatura: [0, Validators.required],
      estadoRecurso: [0, Validators.required],
      tipoRecurso: ['', Validators.required],
      link: ['', Validators.required],
      nombreRecurso: ['', Validators.required],
      nombreRevisor: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }
  setData(data:any){
    if(data){
      this.recursoGroupForm.get('idNivel')?.setValue(data.idNivel);
      this.recursoGroupForm.get('idAsignatura')?.setValue(data.idAsignatura);
      this.recursoGroupForm.get('idEstado')?.setValue(data.idEstado);
      this.recursoGroupForm.get('tipoRecurso')?.setValue(data.tipoRecurso);
      this.recursoGroupForm.get('link')?.setValue(data.recurso);
      this.recursoGroupForm.get('nombreRecurso')?.setValue(data.nombreRecurso);
      this.recursoGroupForm.get('nombreRevisor')?.setValue(data.nombreRevisor);
      this.recursoGroupForm.get('observaciones')?.setValue(data.observaciones);
    }
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


  
  
  getRecurso(idRecurso: number) {
    this.recursoService.getRecurso(idRecurso).subscribe((res: any) => {
      console.log(res);
      this.datosRecursos = res.data;
    });
  }

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

  // getCurrenResource(): Recurso {
  //   return this.recursoGroupForm.value as Recurso;
  // }

  isLink(){
    return this.recursoGroupForm.value.tipoRecurso === 'Link';
  }
  isFile(){
    return this.recursoGroupForm.value.tipoRecurso === 'Archivo';
  }
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

  // cancelar() {
  //   this.dialogRef.close();
  // }

}
