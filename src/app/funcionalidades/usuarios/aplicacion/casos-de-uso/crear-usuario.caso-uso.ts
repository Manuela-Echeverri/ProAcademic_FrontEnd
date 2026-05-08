import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USUARIOS_SALIDA_PUERTO, UsuariosSalidaPuerto } from '../../dominio/puertos/salida/usuarios-salida.puerto';
import { Usuario } from '../../dominio/modelos/usuario.modelo';
import { CrearUsuario } from '../../dominio/modelos/crear-usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioCasoUso {

  constructor(
    @Inject(USUARIOS_SALIDA_PUERTO) private puerto: UsuariosSalidaPuerto
  ) {}

  ejecutar(usuario: CrearUsuario): Observable<Usuario> {
    return this.puerto.crear(usuario);
  }
}
