import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environments';
import { Actividad, Curso, Entrega, Nota } from '../../../dominio/modelos/docente.modelos';

@Injectable({ providedIn: 'root' })
export class DocenteAdaptador {

  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/docente`;

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  cursos(docenteId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.api}/${docenteId}/cursos`,
      { headers: this.headers() });
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.api}/cursos`, curso,
      { headers: this.headers() });
  }

  estudiantes(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/cursos/${cursoId}/estudiantes`,
      { headers: this.headers() });
  }

  actividades(cursoId: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.api}/cursos/${cursoId}/actividades`,
      { headers: this.headers() });
  }

  crearActividad(a: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(`${this.api}/actividades`, a,
      { headers: this.headers() });
  }

  actualizarActividad(id: number, a: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.api}/actividades/${id}`, a,
      { headers: this.headers() });
  }

  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/actividades/${id}`,
      { headers: this.headers() });
  }

  entregas(actividadId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.api}/actividades/${actividadId}/entregas`,
      { headers: this.headers() });
  }

  comentar(entregaId: number, comentario: string, calificacion: number): Observable<Entrega> {
    return this.http.put<Entrega>(`${this.api}/entregas/${entregaId}/comentario`,
      { comentarioDocente: comentario, calificacion },
      { headers: this.headers() });
  }

  notas(cursoId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.api}/cursos/${cursoId}/notas`,
      { headers: this.headers() });
  }

  actualizarNota(notaId: number, valor: number, observacion: string): Observable<Nota> {
    return this.http.put<Nota>(`${this.api}/notas/${notaId}`,
      { valor, observacion },
      { headers: this.headers() });
  }

materias(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/materias`,
    { headers: this.headers() });
}

}