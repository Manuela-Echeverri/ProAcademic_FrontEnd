import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AUTENTICACION_SALIDA_PUERTO, AutenticacionSalidaPuerto } from '../../dominio/puertos/salida/autenticacion-salida.puerto';
import { AlmacenamientoServicio } from '../../../../nucleo/servicios/almacenamiento.servicio';
import { Credenciales } from '../../dominio/modelos/credenciales.modelo';
import { Sesion } from '../../dominio/modelos/sesion.modelo';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionCasoUso {

  constructor(
    @Inject(AUTENTICACION_SALIDA_PUERTO) private puerto: AutenticacionSalidaPuerto,
    private almacenamiento: AlmacenamientoServicio
  ) {}

  ejecutar(credenciales: Credenciales): Observable<Sesion> {
    return this.puerto.login(credenciales).pipe(
      tap((sesion: Sesion) => {
        this.almacenamiento.guardar('token', sesion.token);
        this.almacenamiento.guardar('sesion', sesion);
      })
    );
  }
}
