export interface Recurso {
  idNivel: number;
  idAsignatura: number;
  tipoRecurso: string;
  nombreRecurso: string;
  link?: string;
  recurso?: string;
  estado?: string;
}

export interface ListaRecurso {
  idRecurso: number;
  nombreRecurso: string;
  asignatura: string;
  nivel: string;
  fechaCreacion: Date;
  tipoRecurso: string;
  usuarioCreacion: string;
}
