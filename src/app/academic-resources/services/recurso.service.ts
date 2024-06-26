import { Injectable, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HelperHttpService } from '../../shared/services/helper.http.service';
import { Nivel } from '../interfaces/nivel.inteface';
import { Asignatura } from '../interfaces/asignatura.inteface';
import { Estado } from '../interfaces/estados.interface';
import {
  ListaRecurso,
  Recurso,
  RecursoEdit,
  RecursoResponse,
} from '../interfaces/recurso.interface';
import { Docente } from '../interfaces/docente.interface';

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

  getAsignaturasPorNivel(idNivel: number) {
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

  getRecurso(idRecurso: number) {
    return this.http.get<RecursoResponse>(`recursos/obtener/${idRecurso}`, {
      headers: this.headers,
    });
  }
  editarRecurso(recurso: RecursoEdit) {
    return this.http.put<RecursoEdit>('recursos/actualizar', recurso, {
      headers: this.headers,
    });
  }
  eliminarRecurso(idRecurso: number) {
    return this.http.delete(`recursos/eliminar/${idRecurso}`, {
      headers: this.headers,
    });
  }

  getDocentes() {
    return this.http.get<Docente>('docentes', {
      headers: this.headers,
    });
  }
}
