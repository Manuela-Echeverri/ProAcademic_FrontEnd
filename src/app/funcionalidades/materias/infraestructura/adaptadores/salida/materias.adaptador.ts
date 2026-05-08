import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseServicio } from '../../../../../nucleo/servicios/http-base.servicio';
import { MateriasSalidaPuerto } from '../../../dominio/puertos/salida/materias-salida.puerto';
import { Materia } from '../../../dominio/modelos/materia.modelo';
import { CrearMateria } from '../../../dominio/modelos/crear-materia.modelo';

@Injectable({
  providedIn: 'root'
})
export class MateriasAdaptador implements MateriasSalidaPuerto {

  constructor(private http: HttpBaseServicio) {}

  obtenerTodas(): Observable<Materia[]> {
    return this.http.get<Materia[]>('materias');
  }

  obtenerPorId(id: number): Observable<Materia> {
    return this.http.get<Materia>(`materias/${id}`);
  }

  crear(materia: CrearMateria): Observable<Materia> {
    return this.http.post<Materia>('materias', materia);
  }

  actualizar(id: number, materia: Partial<Materia>): Observable<Materia> {
    return this.http.put<Materia>(`materias/${id}`, materia);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`materias/${id}`);
  }
}
