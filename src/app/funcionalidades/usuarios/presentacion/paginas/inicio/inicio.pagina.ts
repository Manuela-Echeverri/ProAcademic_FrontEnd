import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlmacenamientoServicio } from '../../../../../nucleo/servicios/almacenamiento.servicio';
import { Sesion } from '../../../../autenticacion/dominio/modelos/sesion.modelo';

@Component({
  selector: 'app-inicio-pagina',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './inicio.pagina.html'
})
export class InicioPagina {

  sesion: Sesion | null = null;
  menuAbierto = true;

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
    this.router.navigate([ruta]);
  }
}