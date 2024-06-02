import { Component, OnInit } from '@angular/core';
import { Nivel } from '../../interfaces/nivel.inteface';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'resources-filters',
  templateUrl: './resource-filters.component.html',
  styles: ``
})
export class ResourceFiltersComponent implements OnInit {
  
  nivelesType: { label: string; value: string }[] = [];
  asignaturas: { label: string; value: string }[] = [];

  constructor(private recursoService: RecursoService) {}


  ngOnInit() {
    this.loadNiveles();
  }


  loadNiveles() {
    this.recursoService.getNiveles().subscribe((res: any) => {
      this.nivelesType = res.data.map((nivel: Nivel) => ({
        label: nivel.descripcion,
        value: nivel.idNivel,
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

}
