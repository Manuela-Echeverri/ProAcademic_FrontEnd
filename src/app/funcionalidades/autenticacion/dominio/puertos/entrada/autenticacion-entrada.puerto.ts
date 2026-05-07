import { Observable } from 'rxjs';
import { Credenciales } from '../../modelos/credenciales.modelo';
import { Sesion } from '../../modelos/sesion.modelo';

export interface AutenticacionEntradaPuerto {
  iniciarSesion(credenciales: Credenciales): Observable<Sesion>;
  cerrarSesion(): void;
  obtenerSesionActual(): Sesion | null;
  estaAutenticado(): boolean;
}
