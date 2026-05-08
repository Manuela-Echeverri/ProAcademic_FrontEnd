import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Credenciales } from '../../modelos/credenciales.modelo';
import { Sesion } from '../../modelos/sesion.modelo';

export interface AutenticacionSalidaPuerto {
  login(credenciales: Credenciales): Observable<Sesion>;
}

export const AUTENTICACION_SALIDA_PUERTO = new InjectionToken<AutenticacionSalidaPuerto>(
  'AutenticacionSalidaPuerto'
);
