export interface Recurso {
  idNivel: number;
  idAsignatura: number;
  tipoRecurso: string;
  nombreRecurso: string;
  link: string | null;
  recurso: string | null;
  extension: string;
}

export interface ListaRecurso {
  idRecurso: number;
  nombreRecurso: string;
  asignatura: string;
  nivel: string;
  fechaCreacion: Date;
  tipoRecurso: string;
  usuarioCreacion: string;
  estadoRecurso: string;
}

export interface RecursoResponse {
  idNivel: number;
  idAsignatura: number;
  tipoRecurso: string;
  estadoRecurso: number;
  nombreRecurso: string;
  link: string | null;
  recurso: string | null;
  docenteRevisor: string;
  observaciones: string;
}