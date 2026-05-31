import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardian implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/autenticacion/login']);
      return false;
    }

    const raw = localStorage.getItem('sesion') || '{}';
    let sesion: any = {};
    try {
      const parsed = JSON.parse(raw);
      // AlmacenamientoServicio.guardar() usa JSON.stringify, puede estar doblemente serializado
      sesion = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
    } catch { }

    const rol = sesion?.rol?.toUpperCase();
    const ruta = route.routeConfig?.path || '';

    // Rutas solo para admin
    if (['usuarios', 'materias', 'notas', 'inicio'].includes(ruta) && rol === 'DOCENTE') {
      this.router.navigate(['/docente/cursos']);
      return false;
    }

    // Rutas solo para docente
    if (ruta === 'docente' && rol !== 'DOCENTE') {
      this.router.navigate(['/inicio']);
      return false;
    }

    // Rutas solo para estudiante
    if (ruta === 'estudiante' && rol !== 'ESTUDIANTE') {
      this.router.navigate(['/inicio']);
      return false;
    }

    return true;
  }
}