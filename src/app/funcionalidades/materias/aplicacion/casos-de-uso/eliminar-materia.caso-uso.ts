import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MATERIAS_SALIDA_PUERTO, MateriasSalidaPuerto } from '../../dominio/puertos/salida/materias-salida.puerto';

@Injectable({
  providedIn: 'root'
})
export class EliminarMateriaCasoUso {

  constructor(
    @Inject(MATERIAS_SALIDA_PUERTO) private puerto: MateriasSalidaPuerto
  ) {}

  ejecutar(id: number): Observable<void> {
    return this.puerto.eliminar(id);
  }
}