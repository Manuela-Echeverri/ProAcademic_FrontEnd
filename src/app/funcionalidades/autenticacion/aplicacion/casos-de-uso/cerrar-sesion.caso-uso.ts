import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenamientoServicio } from '../../../../nucleo/servicios/almacenamiento.servicio';

@Injectable({
  providedIn: 'root'
})
export class CerrarSesionCasoUso {

  constructor(
    private almacenamiento: AlmacenamientoServicio,
    private router: Router
  ) {}

  ejecutar(): void {
    this.almacenamiento.limpiar();
    this.router.navigate(['/autenticacion/login']);
  }
}
