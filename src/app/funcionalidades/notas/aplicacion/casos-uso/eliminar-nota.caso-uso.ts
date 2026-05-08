import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTAS_SALIDA_PUERTO, NotasSalidaPuerto } from '../../dominio/puertos/salida/notas-salida.puerto';

@Injectable({
  providedIn: 'root'
})
export class EliminarNotaCasoUso {

  constructor(
    @Inject(NOTAS_SALIDA_PUERTO) private puerto: NotasSalidaPuerto
  ) {}

  ejecutar(id: number): Observable<void> {
    return this.puerto.eliminar(id);
  }
}
