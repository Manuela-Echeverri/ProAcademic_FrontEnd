import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseServicio } from '../../../../../nucleo/servicios/http-base.servicio';
import { UsuariosSalidaPuerto } from '../../../dominio/puertos/salida/usuarios-salida.puerto';
import { Usuario } from '../../../dominio/modelos/usuario.modelo';
import { CrearUsuario } from '../../../dominio/modelos/crear-usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdaptador implements UsuariosSalidaPuerto {

  constructor(private http: HttpBaseServicio) {}

  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('usuarios');
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`usuarios/${id}`);
  }

  crear(usuario: any): Observable<Usuario> {

  const payload = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    usuario: usuario.usuario,
    contrasena: usuario.contrasena,
    rol: usuario.rol
  };

  return this.http.post<Usuario>('usuarios', payload);
}

  actualizar(id: number, usuario: any): Observable<Usuario> {

  const payload = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    usuario: usuario.usuario,
    contrasena: usuario.contrasena,
    rol: usuario.rol
  };

  return this.http.put<Usuario>(`usuarios/${id}`, payload);
}

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`usuarios/${id}`);
  }
}
