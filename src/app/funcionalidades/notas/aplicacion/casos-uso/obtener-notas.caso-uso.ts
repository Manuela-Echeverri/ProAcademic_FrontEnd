import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTAS_SALIDA_PUERTO, NotasSalidaPuerto } from '../../dominio/puertos/salida/notas-salida.puerto';
import { Nota } from '../../dominio/modelos/nota.modelo';

@Injectable({
  providedIn: 'root'
})
export class ObtenerNotasCasoUso {

  constructor(
    @Inject(NOTAS_SALIDA_PUERTO) private puerto: NotasSalidaPuerto
  ) {}

  ejecutar(): Observable<Nota[]> {
    return this.puerto.obtenerTodas();
  }

  porEstudiante(estudianteId: number): Observable<Nota[]> {
    return this.puerto.obtenerPorEstudiante(estudianteId);
  }

  porMateria(materiaId: number): Observable<Nota[]> {
    return this.puerto.obtenerPorMateria(materiaId);
  }
}
