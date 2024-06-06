import { Component, OnInit } from '@angular/core';
import { ListaDocentes } from '../../interfaces/lista-docentes.interface';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-docente-table',
  templateUrl: './docente-table.component.html',
  styles: ``,
})
export class DocenteTableComponent implements OnInit {
  data: ListaDocentes[] = [];
  nombresCompletos: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  cedula: string = '';
  correo: string = '';
  telefono: string = '';

  constructor(private securityService: SecurityService) {}
  ngOnInit(): void {
    this.loadDocentes();
  }

  loadDocentes() {
    this.securityService.getListaDocentes().subscribe((res: any) => {
      this.data = res.data;
      this.nombresCompletos = res.data.nombresCompletos;
      this.cedula = res.data.cedula;
      this.correo = res.data.correo;
      this.telefono = res.data.telefono;
    });
  }

  get paginatedData(): ListaDocentes[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filteredData = this.data.filter((docente) => {
      return (
        docente.idDocente &&
        docente.nombresCompletos
          .toLowerCase()
          .includes(this.nombresCompletos.toLowerCase()) &&
        docente.cedula.toLowerCase().includes(this.cedula.toLowerCase()) &&
        docente.correo.toLowerCase().includes(this.correo.toLowerCase()) &&
        docente.telefono.toLowerCase().includes(this.telefono.toLowerCase())
      );
    });
    return filteredData.slice(start, end);
  }

  verCargaHoraria(idDocente: string) {
    console.log(idDocente);
  }
}
