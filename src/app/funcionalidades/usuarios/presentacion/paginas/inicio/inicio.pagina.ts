import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AlmacenamientoServicio } from '../../../../../nucleo/servicios/almacenamiento.servicio';
import { Sesion } from '../../../../autenticacion/dominio/modelos/sesion.modelo';

@Component({
  selector: 'app-inicio-pagina',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './inicio.pagina.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class InicioPagina {

  sesion: Sesion | null = null;
  menuAbierto = true;
  rutaActiva = '/inicio';
  fechaHoy = new Date().toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  menuItems = [
    { icono: 'dashboard', etiqueta: 'Inicio', ruta: '/inicio' },
    { icono: 'people', etiqueta: 'Usuarios', ruta: '/usuarios' },
    { icono: 'book', etiqueta: 'Materias', ruta: '/materias' },
    { icono: 'grade', etiqueta: 'Notas', ruta: '/notas' }
  ];

  constructor(
    private almacenamiento: AlmacenamientoServicio,
    private router: Router
  ) {
    this.sesion = this.almacenamiento.obtener<Sesion>('sesion');
  }

  cerrarSesion(): void {
    this.almacenamiento.limpiar();
    this.router.navigate(['/autenticacion/login']);
  }

  navegarA(ruta: string): void {
    this.rutaActiva = ruta;
    this.router.navigate([ruta]);
  }
}