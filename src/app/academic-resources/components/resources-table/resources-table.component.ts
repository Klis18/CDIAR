import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ListaRecurso } from '../../interfaces/recurso.interface';
import { RecursoService } from '../../services/recurso.service';
import { HomeService } from '../../../home/services/home.service';
import { AcademicResourcesComponent } from '../../../home/pages/academic-resources/academic-resources.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardConfirmComponent } from '../../../shared/pages/card-confirm/card-confirm.component';
import { EditResourceComponent } from '../edit-resource/edit-resource.component';
import { ParseTreeResult } from '@angular/compiler';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``,
})
export class ResourcesTableComponent implements OnInit {
  @Input() filterByUser: string = '';
  @Input() filterByStatus: string = '';
  @Input() filterByRevisor: string = '';

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

  // get paginatedData(): ListaRecurso[] {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;

  //   const filteredData = this.data.filter((item) =>
  //     this.filterByUser
  //       ? item.usuarioCreacion === this.filterByUser
  //       : true && item.estadoRecurso !== 'Eliminado'
  //   );
  //   return filteredData.slice(start, end);
  // }

  get paginatedData(): ListaRecurso[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    const filteredData = this.data.filter(
      (item) =>
        (this.filterByUser
          ? item.usuarioCreacion === this.filterByUser
          : true) &&
        (this.filterByRevisor
          ? item.docenteRevisor === this.filterByRevisor
          : true) &&
        (this.filterByStatus
          ? item.estadoRecurso === this.filterByStatus
          : item.estadoRecurso !== 'Eliminado')
    );
    return filteredData.slice(start, end);
  }

  eliminarRecurso(idRecurso: number) {
    const dialogRef = this.openDialog(
      '¿Estás seguro de eliminar este recurso?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('Eliminando recurso', res);
        this.recursoService.eliminarRecurso(idRecurso).subscribe(() => {
          console.log('Recurso eliminado');
          this.listaRecursos();
        });
      }
    });
  }

  editarRecurso(idRecurso: number) {
    this.dialog.open(EditResourceComponent, {
      width: '40%',
      data: idRecurso,
    });
  }

  //PRUEBA EDITAR RECURSO
  // editResource(element: any): void {
  //   const dialogRef: MatDialogRef<EditResourceComponent> = this.dialog.open(
  //     EditResourceComponent,
  //     {
  //       data: element.idRecurso,
  //       width: '800px',
  //       maxHeight: '750px',
  //     },
  //   );

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === '200') {

  //       console.log('Registro editado correctamente');
  //       this.listaRecursos();
  //     } else if (result === '500') {

  //       console.log('Error');
  //     }
  //   });
  // }

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

  getIcon(tipoRecurso: string) {
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
}
