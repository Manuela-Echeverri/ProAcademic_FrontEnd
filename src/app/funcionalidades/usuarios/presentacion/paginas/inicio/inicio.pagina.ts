import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inicio-pagina',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './inicio.pagina.html'
})
export class InicioPagina {

  menuAbierto = true;

  sesion = JSON.parse(localStorage.getItem('sesion') || '{}');

  rutaActiva = '/admin/usuarios';

  fechaHoy = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  menuItems = [
    {
      etiqueta: 'Usuarios',
      icono: 'group',
      ruta: '/admin/usuarios'
    },
    {
      etiqueta: 'Materias',
      icono: 'menu_book',
      ruta: '/admin/materias'
    },
    {
      etiqueta: 'Notas',
      icono: 'grading',
      ruta: '/admin/notas'
    }
  ];

  constructor(private router: Router) {}

  navegarA(ruta: string) {
    this.rutaActiva = ruta;
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/autenticacion/login']);
  }

}