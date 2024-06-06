import { Component, OnInit, inject } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { ListaDocentes } from '../../interfaces/lista-docentes.interface';
import { DocenteAprobacion } from '../../interfaces/docente-aprobacion.interface';

@Component({
  selector: 'aprobar-docente',
  templateUrl: './aprobar-docente.component.html',
  styles: ``,
})
export class AprobarDocenteComponent implements OnInit {
  docenteAprobado:boolean = false;
  data: ListaDocentes[] = [];
  nombresCompletos: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  cedula: string = '';
  correo: string = '';
  telefono: string = '';
  fechaSolicitud: Date = new Date();
  private securityService = inject(SecurityService);

  ngOnInit(): void {
    this.listaDocentes();
  }

  listaDocentes() {
    this.securityService.getListaDocenteAprobar().subscribe((res: any) => {
      this.data = res.data;
      this.nombresCompletos = res.data.nombresCompletos;
      this.cedula = res.data.cedula;
      this.correo = res.data.correo;
      this.telefono = res.data.telefono;
      this.fechaSolicitud = res.data.fechaSolicitud;
    });
  }

  get paginatedData(): ListaDocentes[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filteredData = this.data.filter((docente) => {
      return (
        docente.nombresCompletos
          .toLowerCase()
          .includes(this.nombresCompletos.toLowerCase()) &&
        docente.cedula.toLowerCase().includes(this.cedula.toLowerCase()) &&
        docente.correo.toLowerCase().includes(this.correo.toLowerCase()) &&
        docente.telefono.toLowerCase().includes(this.telefono.toLowerCase()) &&
        docente.fechaSolicitud
          .toString()
          .toLowerCase()
          .includes(this.fechaSolicitud.toString().toLowerCase())
      );
    });
    return filteredData.slice(start, end);
  }



  getCurrentDocente(docente: DocenteAprobacion) {
    docente.correo = this.correo;
    return docente;
  }

  aprobarDocente(docente: DocenteAprobacion) {
    docente.aprobado = true;
    this.securityService.aprobarDocente(docente).subscribe((res) => {
      console.log(res);
    });
  }

  rechazarDocente(docente: DocenteAprobacion) {
    docente.aprobado = false;
    this.securityService.aprobarDocente(docente).subscribe((res) => {
      console.log(res);
    });
  }
}
