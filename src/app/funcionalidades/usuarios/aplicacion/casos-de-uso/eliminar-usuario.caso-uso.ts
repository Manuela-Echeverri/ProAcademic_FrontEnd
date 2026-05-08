import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USUARIOS_SALIDA_PUERTO, UsuariosSalidaPuerto } from '../../dominio/puertos/salida/usuarios-salida.puerto';

@Injectable({
  providedIn: 'root'
})
export class EliminarUsuarioCasoUso {

  constructor(
    @Inject(USUARIOS_SALIDA_PUERTO) private puerto: UsuariosSalidaPuerto
  ) {}

  ejecutar(id: number): Observable<void> {
    return this.puerto.eliminar(id);
  }
}
