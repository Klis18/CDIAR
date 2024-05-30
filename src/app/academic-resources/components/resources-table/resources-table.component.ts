import { Component, Input, OnInit, inject } from '@angular/core';
import { ListaRecurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../services/recurso.service';
import { HomeService } from '../../../home/services/home.service';
import { AcademicResourcesComponent } from '../../../home/pages/academic-resources/academic-resources.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardConfirmComponent } from '../../../shared/pages/card-confirm/card-confirm.component';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``,
})
export class ResourcesTableComponent implements OnInit {

  mensaje: string = '';

  openDialog(message: string) {
    return this.dialog.open(CardConfirmComponent, {
      data: {
        mensaje: message,
      },
      width: '30%',
    });
  }

  usuario: string = '';
  

  private homeService = inject(HomeService);

  @Input() filterByUser: string = '';

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
    const dialogRef = this.openDialog('¿Estás seguro de eliminar este recurso?');
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('Eliminando recurso',res);
        this.recursoService.eliminarRecurso(idRecurso).subscribe(() => {
          console.log('Recurso eliminado');
          this.listaRecursos();
        });
      }
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

  getStyleColor(tipoRecurso: string){
    switch (tipoRecurso) {
        case 'Documento':
            return 'bg-cyan-700';
        case 'Link':
            return 'bg-orange-600';
        case 'Archivo':
            return 'bg-pink-700';
        default:
          return '';
    }
  }

  getIcon(tipoRecurso: string){
    switch (tipoRecurso) {
        case 'Archivo':
            return 'insert_drive_file';
        case 'Link':
            return 'insert_drive_file';
        case 'Imagen':
            return 'image';
        default:
          return '';
    }
  }
}
