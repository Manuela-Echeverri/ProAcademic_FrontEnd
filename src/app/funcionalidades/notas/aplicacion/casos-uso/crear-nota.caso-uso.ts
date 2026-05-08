import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTAS_SALIDA_PUERTO, NotasSalidaPuerto } from '../../dominio/puertos/salida/notas-salida.puerto';
import { Nota } from '../../dominio/modelos/nota.modelo';
import { CrearNota } from '../../dominio/modelos/crear-nota.modelo';

@Injectable({
  providedIn: 'root'
})
export class CrearNotaCasoUso {

  constructor(
    @Inject(NOTAS_SALIDA_PUERTO) private puerto: NotasSalidaPuerto
  ) {}

  ejecutar(nota: CrearNota): Observable<Nota> {
    return this.puerto.crear(nota);
  }
}
