import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-docente-inicio',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterOutlet, MatIconModule],
    templateUrl: './docente-inicio.pagina.html'
})
export class DocenteInicioPagina {

    menuAbierto = true;

    sesion = JSON.parse(localStorage.getItem('sesion') || '{}');

    rutaActiva = '/docente/cursos';

    fechaHoy = new Date().toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    menuItems = [
        {
            etiqueta: 'Mis Cursos',
            icono: 'book',
            ruta: '/docente/cursos'
        }
    ];

    constructor(private router: Router) { }

    navegarA(ruta: string) {
        this.rutaActiva = ruta;
        this.router.navigate([ruta]);
    }

    cerrarSesion() {
        localStorage.clear();
        this.router.navigate(['/autenticacion/login']);
    }
}