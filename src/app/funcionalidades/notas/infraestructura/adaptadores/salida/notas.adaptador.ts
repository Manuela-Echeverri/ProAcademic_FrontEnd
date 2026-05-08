import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseServicio } from '../../../../../nucleo/servicios/http-base.servicio';
import { NotasSalidaPuerto } from '../../../dominio/puertos/salida/notas-salida.puerto';
import { Nota } from '../../../dominio/modelos/nota.modelo';
import { CrearNota } from '../../../dominio/modelos/crear-nota.modelo';

@Injectable({
  providedIn: 'root'
})
export class NotasAdaptador implements NotasSalidaPuerto {

  constructor(private http: HttpBaseServicio) {}

  obtenerTodas(): Observable<Nota[]> {
    return this.http.get<Nota[]>('notas');
  }

  obtenerPorEstudiante(estudianteId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`notas/estudiante/${estudianteId}`);
  }

  obtenerPorMateria(materiaId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`notas/materia/${materiaId}`);
  }

  crear(nota: CrearNota): Observable<Nota> {
    return this.http.post<Nota>('notas', nota);
  }

  actualizar(id: number, nota: Partial<Nota>): Observable<Nota> {
    return this.http.put<Nota>(`notas/${id}`, nota);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`notas/${id}`);
  }
}
