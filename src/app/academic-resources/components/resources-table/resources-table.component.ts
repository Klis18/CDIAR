import { Component, Input, OnInit, inject } from '@angular/core';
import { ListaRecurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../services/recurso.service';
import { HomeService } from '../../../home/services/home.service';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``,
})
export class ResourcesTableComponent implements OnInit {

  usuario: string = '';
  

  private homeService = inject(HomeService);

  @Input() filterByUser: string = '';
  
  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.listaRecursos();

    this.homeService.obtenerDatosMenu().subscribe((user) => {
      console.log(user);
      this.usuario = user.data.userName;
    });
  }

  data: ListaRecurso[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  listaRecursos() {
    this.recursoService.getRecursos().subscribe((res: any) => {
      this.data = res.data;
    });
  }

 
  get paginatedData(): ListaRecurso[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  
    const filteredData = this.data.filter(item => this.filterByUser ? item.usuarioCreacion === this.filterByUser : true);
  
    return filteredData.slice(start, end);
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getStyleColor(tipoRecurso: string){
    switch (tipoRecurso) {
        case 'Documento':
            return 'bg-cyan-700';
        case 'Link':
            return 'bg-orange-600';
        case 'Imagen':
            return 'bg-pink-700';
        default:
          return '';
    }
  }

  getIcon(tipoRecurso: string){
    switch (tipoRecurso) {
        case 'Documento':
            return 'file';
        case 'Enlace':
            return 'insert_drive_file';
        case 'Imagen':
            return 'image';
        default:
          return '';
    }
  }
}
