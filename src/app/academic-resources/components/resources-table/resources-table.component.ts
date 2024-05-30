import { Component, Input, OnInit } from '@angular/core';
import { ListaRecurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../services/recurso.service';
import { AcademicResourcesComponent } from '../../../home/pages/academic-resources/academic-resources.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``,
})
export class ResourcesTableComponent implements OnInit {
  @Input() filterByUser: string = '';

  constructor(
    private recursoService: RecursoService,
    private academic: AcademicResourcesComponent,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listaRecursos();
  }

  data: ListaRecurso[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  selectedTab = this.academic.selectedTab;

  listaRecursos() {
    this.recursoService.getRecursos().subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
    });
  }

  get paginatedData(): ListaRecurso[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const filteredData = this.data.filter((item) =>
      this.filterByUser
        ? item.usuarioCreacion === this.filterByUser
        : true && item.estadoRecurso !== 'Eliminado'
    );
    return filteredData.slice(start, end);
  }

  eliminarRecurso(idRecurso: number) {
    window.confirm('¿Estás seguro de eliminar este recurso?');
    if (!window.confirm) {
      return;
    }
    this.recursoService.eliminarRecurso(idRecurso).subscribe(() => {
      this.listaRecursos();
    });
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
