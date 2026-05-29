import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-estudiante-inicio',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './estudiante-inicio.pagina.html'
})
export class EstudianteInicioPagina {

    sesion: any = null;
    menuAbierto = true;
    fechaHoy = new Date().toLocaleDateString('es-CO', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    menuItems = [
        { icono: 'school', etiqueta: 'Mis Cursos', ruta: '/estudiante/cursos' },
        { icono: 'assignment', etiqueta: 'Actividades', ruta: '/estudiante/actividades' },
        { icono: 'grade', etiqueta: 'Mis Notas', ruta: '/estudiante/notas' }
    ];

    constructor(private router: Router) {
        const raw = localStorage.getItem('sesion');
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                this.sesion = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
            } catch {
                this.sesion = null;
            }
        }
    }

    get rutaActiva(): string {
        return this.router.url;
    }

    cerrarSesion(): void {
        localStorage.clear();
        this.router.navigate(['/autenticacion/login']);
    }

    navegarA(ruta: string): void {
        this.router.navigate([ruta]);
    }
}