import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelos/usuario.modelo';
import { CrearUsuario } from '../../modelos/crear-usuario.modelo';

export interface UsuariosSalidaPuerto {
  obtenerTodos(): Observable<Usuario[]>;
  obtenerPorId(id: number): Observable<Usuario>;
  crear(usuario: CrearUsuario): Observable<Usuario>;
  actualizar(id: number, usuario: Partial<Usuario>): Observable<Usuario>;
  eliminar(id: number): Observable<void>;
}

export const USUARIOS_SALIDA_PUERTO = new InjectionToken<UsuariosSalidaPuerto>(
  'UsuariosSalidaPuerto'
);
