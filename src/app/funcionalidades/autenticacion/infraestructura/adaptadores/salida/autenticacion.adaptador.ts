import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseServicio } from '../../../../../nucleo/servicios/http-base.servicio';
import { AutenticacionSalidaPuerto } from '../../../dominio/puertos/salida/autenticacion-salida.puerto';
import { Credenciales } from '../../../dominio/modelos/credenciales.modelo';
import { Sesion } from '../../../dominio/modelos/sesion.modelo';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionAdaptador implements AutenticacionSalidaPuerto {

  constructor(private http: HttpBaseServicio) {}

  login(credenciales: Credenciales): Observable<Sesion> {
    return this.http.post<Sesion>('auth/login', credenciales);
  }
}
