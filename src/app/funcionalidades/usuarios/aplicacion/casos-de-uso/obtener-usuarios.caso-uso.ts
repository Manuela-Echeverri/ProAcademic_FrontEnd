import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USUARIOS_SALIDA_PUERTO, UsuariosSalidaPuerto } from '../../dominio/puertos/salida/usuarios-salida.puerto';
import { Usuario } from '../../dominio/modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuariosCasoUso {

  constructor(
    @Inject(USUARIOS_SALIDA_PUERTO) private puerto: UsuariosSalidaPuerto
  ) {}

  ejecutar(): Observable<Usuario[]> {
    return this.puerto.obtenerTodos();
  }
}
