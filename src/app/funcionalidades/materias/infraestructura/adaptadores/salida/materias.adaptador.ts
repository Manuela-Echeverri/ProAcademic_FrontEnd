import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Materia } from '../../../dominio/modelos/materia.modelo';
import { environment } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MateriasAdaptador {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/materias`;

  listar(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.api);
  }

  crear(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.api, materia);
  }

  actualizar(id: number, materia: Materia): Observable<Materia> {
    return this.http.put<Materia>(`${this.api}/${id}`, materia);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}