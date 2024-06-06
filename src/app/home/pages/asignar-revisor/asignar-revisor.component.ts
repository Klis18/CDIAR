import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaRecurso } from '../../../academic-resources/interfaces/recurso.interface';
import { RecursoService } from '../../../academic-resources/services/recurso.service';
import { HomeService } from '../../services/home.service';
import { AcademicResourcesComponent } from '../academic-resources/academic-resources.component';
import { EditResourceComponent } from '../../../academic-resources/components/edit-resource/edit-resource.component';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-asignar-revisor',
  templateUrl: './asignar-revisor.component.html',
  styles: ``
})
export class AsignarRevisorComponent {
  @Input() filterByStatus: string = '';
  //selectedTab = 'Recursos Académicos';
  


  //CÓDIGO DE PRUEBA

  usuario: string = '';

  private homeService = inject(HomeService);

  constructor(
    private recursoService: RecursoService,
    private academic: AcademicResourcesComponent,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listaRecursos();

    this.homeService.obtenerDatosMenu().subscribe((user) => {
      console.log(user);
      this.usuario = user.data.userName;
    });
    this.selectedTab = 'Recursos Académicos'
  }

  data: ListaRecurso[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  selectedTab = this.academic.selectedTab;
  nombreRecurso: string = '';
  nivel: string = '';
  asignatura: string = '';

  listaRecursos() {
    this.recursoService.getRecursos().subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.nombreRecurso = res.data.nombreRecurso;
      this.nivel = res.data.nivel;
      this.asignatura = res.data.asignatura;
    });
  }

  get paginatedData(): ListaRecurso[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const filteredData = this.data.filter(
      (item) =>
        item.docenteRevisor === '' && item.estadoRecurso === 'Ingresado'
        
    );
    return filteredData.slice(start, end);
  }

  editarRecurso(idRecurso: number) {
    this.dialog.open(EditResourceComponent, {
      width: '40%',
      data: idRecurso,
    });
  }
  getStyleColor(tipoRecurso: string) {
    switch (tipoRecurso) {
      case 'Archivo':
        return 'bg-cyan-700';
      case 'Link':
        return 'bg-orange-600';
      case 'Imagen':
        return 'bg-pink-700';
      default:
        return '';
    }
  }

  openFileInTab(item: any): string {
    let urlRecurso: string = '';

    if (item.tipoRecurso === 'Link') {
      urlRecurso = item.enlaceRecurso;
    } else if (
      item.tipoRecurso === 'Archivo' ||
      item.tipoRecurso === 'Imagen'
    ) {
      urlRecurso = item.recurso;
    }
    return urlRecurso;
  }


  //FIN PRUEBA
}
