import { Observable } from 'rxjs';
import { CursoEstudiante } from '../../modelos/curso-estudiante.modelo';
import { ActividadEstudiante } from '../../modelos/actividad-estudiante.modelo';
import { NotaEstudiante } from '../../modelos/nota-estudiante.modelo';

export interface EstudianteEntradaPuerto {
  cursosDisponibles(): Observable<CursoEstudiante[]>;
  misInscripciones(estudianteId: number): Observable<CursoEstudiante[]>;
  inscribirse(estudianteId: number, cursoId: number): Observable<any>;
  desinscribirse(estudianteId: number, cursoId: number): Observable<any>;
  misActividades(estudianteId: number): Observable<ActividadEstudiante[]>;
  misNotas(estudianteId: number): Observable<NotaEstudiante[]>;
}