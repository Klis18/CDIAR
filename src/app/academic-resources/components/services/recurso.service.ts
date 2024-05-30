import { Injectable, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HelperHttpService } from '../../../shared/services/helper.http.service';
import { Nivel } from '../../interfaces/nivel.inteface';
import { Asignatura } from '../../interfaces/asignatura.inteface';
import { Estado } from '../../interfaces/estados.interface';
import { ListaRecurso, Recurso } from '../../interfaces/recurso.interface';

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private http = inject(HelperHttpService);

  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  getNiveles() {
    return this.http.get<Nivel>('niveles', {
      headers: this.headers,
    });
  }

  getAsignaturasPorNivel(idNivel: string) {
    return this.http.get<Asignatura>(`asignatura/${idNivel}`, {
      headers: this.headers,
    });
  }

  getEstados() {
    return this.http.get<Estado>('estados', {
      headers: this.headers,
    });
  }

  addRecurso(recurso: Recurso) {
    return this.http.post<Recurso>('recursos/crear', recurso, {
      headers: this.headers,
    });
  }

  getRecursos() {
    return this.http.get<ListaRecurso>('recursos/listarecursos', {
      headers: this.headers,
    });
  }

  eliminarRecurso(idRecurso: number) {
    return this.http.delete(`recursos/eliminar/${idRecurso}`, {
      headers: this.headers,
    });
  }
}
