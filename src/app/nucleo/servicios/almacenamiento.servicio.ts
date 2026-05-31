import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoServicio {

  guardar(clave: string, valor: any): void {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  obtener<T>(clave: string): T | null {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : null;
  }

  eliminar(clave: string): void {
    localStorage.removeItem(clave);
  }

  limpiar(): void {
    localStorage.clear();
  }

  existe(clave: string): boolean {
    return localStorage.getItem(clave) !== null;
  }
}
