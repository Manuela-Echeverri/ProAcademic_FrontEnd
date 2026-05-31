export interface Curso {
  id?: number;
  nombre: string;
  descripcion: string;
  periodo: string;
  materiaId: number;
  materiaNombre?: string;
  docenteId: number;
  docenteNombre?: string;
}

export interface Actividad {
  id?: number;
  titulo: string;
  descripcion: string;
  cursoId: number;
  cursoNombre?: string;
  docenteId: number;
  fechaCreacion?: string;
  fechaEntrega: string;
  valorMaximo: number;
}

export interface Entrega {
  id?: number;
  actividadId: number;
  actividadTitulo?: string;
  estudianteId: number;
  estudianteNombre?: string;
  archivoNombre?: string;
  archivoRuta?: string;
  fechaEntrega?: string;
  calificacion?: number;
  comentarioDocente?: string;
}

export interface Nota {
  id?: number;
  estudianteId: number;
  estudianteNombre?: string;
  cursoId: number;
  cursoNombre?: string;
  valor: number;
  observacion?: string;
}