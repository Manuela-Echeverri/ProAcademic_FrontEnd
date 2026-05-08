import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../../modelos/materia.modelo';
import { CrearMateria } from '../../modelos/crear-materia.modelo';

export interface MateriasSalidaPuerto {
  obtenerTodas(): Observable<Materia[]>;
  obtenerPorId(id: number): Observable<Materia>;
  crear(materia: CrearMateria): Observable<Materia>;
  actualizar(id: number, materia: Partial<Materia>): Observable<Materia>;
  eliminar(id: number): Observable<void>;
}

export const MATERIAS_SALIDA_PUERTO = new InjectionToken<MateriasSalidaPuerto>(
  'MateriasSalidaPuerto'
);
