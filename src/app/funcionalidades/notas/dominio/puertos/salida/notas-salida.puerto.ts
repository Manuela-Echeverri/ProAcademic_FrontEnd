import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../../modelos/nota.modelo';
import { CrearNota } from '../../modelos/crear-nota.modelo';

export interface NotasSalidaPuerto {
  obtenerTodas(): Observable<Nota[]>;
  obtenerPorEstudiante(estudianteId: number): Observable<Nota[]>;
  obtenerPorMateria(materiaId: number): Observable<Nota[]>;
  crear(nota: CrearNota): Observable<Nota>;
  actualizar(id: number, nota: Partial<Nota>): Observable<Nota>;
  eliminar(id: number): Observable<void>;
}

export const NOTAS_SALIDA_PUERTO = new InjectionToken<NotasSalidaPuerto>(
  'NotasSalidaPuerto'
);
