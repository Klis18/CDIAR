import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nivel } from '../../interfaces/nivel.inteface';
import { Recurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../services/recurso.service';
export interface State {
  resources: any[]
}

@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styles: ``
})
export class ResourcesFormComponent implements OnInit,OnChanges{

  @Input() formData:any;
  @Output() editedDataEmitter = new EventEmitter<any>(); // To emit edited data
  @Output() valueFormEmitter = new EventEmitter<boolean>(); // To emit edited data

  recursoGroupForm!: FormGroup;
  //showimage!: boolean;
  dataResource!: any;
  base64String!: string
  stateResource: State[] = []
  //showImg!: string;
  state: boolean = false
  // typeanimal: any[] = []
  // StateSalud: any[] = []
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];
  estados: { label: string; value: string }[] = [];

constructor(private fb:FormBuilder, private recursoService: RecursoService) { }

  ngOnInit() {
      this.loadNiveles();
      this.loadEstados();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['formData']) {
        this.state = true
        this.dataResource = changes['formData'].currentValue;
        this.setData(this.dataResource);
  
      }
    }

    createform(){
      this.recursoGroupForm = this.fb.group({
        nivel: ['', Validators.required],
        asignatura: ['', Validators.required],
        tipoRecurso: ['', Validators.required],
        nombreRecurso: ['', Validators.required],
        recurso: ['', Validators.required],
        link: ['', Validators.required],
        estado: ['', Validators.required],
        });
      }

    setData(data:any){
      if(data){
        this.recursoGroupForm.get('nivel')?.setValue(data.nivel);
        this.recursoGroupForm.get('asignatura')?.setValue(data.asignatura);
        this.recursoGroupForm.get('tipoRecurso')?.setValue(data.tipoRecurso);
        this.recursoGroupForm.get('nombreRecurso')?.setValue(data.nombreRecurso);
        this.recursoGroupForm.get('recurso')?.setValue(data.recurso);
        this.recursoGroupForm.get('link')?.setValue(data.link);
        this.recursoGroupForm.get('estado')?.setValue(data.estado);
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
        this.asignaturas = res.data.map((asignatura: any) => ({
          label: asignatura.nombre,
          value: asignatura.idAsignatura,
        }));
      });
  }

  // getCurrenResource(): Recurso {
  //   return this.recursoGroupForm.value as Recurso;
  // }

  // nivelesType: { label: string; value: string }[] = [];
  // asignaturas: { label: string; value: string }[] = [];
  // estados: { label: string; value: string }[] = [];

  // constructor(private recursoService: RecursoService) {}

  // public recursoGroup = new FormGroup({
  //   nivel: new FormGroup({}, Validators.required),
  //   asignatura: new FormGroup({}, Validators.required),
  //   tipoRecurso: new FormGroup<string>('', Validators.required),
  //   nombreRecurso: new FormGroup<string>('', Validators.required),
  //   recurso: new FormGroup('', Validators.required),
  //   link: new FormGroup<string>('', Validators.required),
  //   estado: new FormGroup<string>('', Validators.required),
  // });

  // ngOnInit() {
  //   this.loadNiveles();
  //   this.loadEstados();
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
  //       this.asignaturas = res.data.map((asignatura: any) => ({
  //         label: asignatura.nombre,
  //         value: asignatura.idAsignatura,
  //       }));
  //     });
  // }

  // getCurrenResource(): Recurso {
  //   return this.recursoGroup.value as Recurso;
  // }


}
