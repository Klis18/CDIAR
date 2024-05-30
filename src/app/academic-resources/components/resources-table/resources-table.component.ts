import { Component, Input, OnInit } from '@angular/core';
import { ListaRecurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../services/recurso.service';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``,
})
export class ResourcesTableComponent implements OnInit {

  @Input() filterByUser: string = '';
  
  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.listaRecursos();
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
}
