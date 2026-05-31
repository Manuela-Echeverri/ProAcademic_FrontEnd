import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpBaseServicio } from '../../../../../nucleo/servicios/http-base.servicio';
import { EstudianteSalidaPuerto } from '../../../dominio/puertos/salida/estudiante-salida.puerto';
import { CursoEstudiante } from '../../../dominio/modelos/curso-estudiante.modelo';
import { ActividadEstudiante } from '../../../dominio/modelos/actividad-estudiante.modelo';
import { NotaEstudiante } from '../../../dominio/modelos/nota-estudiante.modelo';
import { environment } from '../../../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class EstudianteAdaptador implements EstudianteSalidaPuerto {

  constructor(
    private http: HttpBaseServicio,
    private httpClient: HttpClient
  ) { }

  cursosDisponibles(): Observable<CursoEstudiante[]> {
    return this.http.get<CursoEstudiante[]>('estudiante/cursos');
  }

  misInscripciones(estudianteId: number): Observable<CursoEstudiante[]> {
    return this.http.get<CursoEstudiante[]>(`estudiante/${estudianteId}/cursos`);
  }

  inscribirse(estudianteId: number, cursoId: number): Observable<any> {
    return this.http.post<any>(`estudiante/${estudianteId}/cursos/${cursoId}`, {});
  }

  desinscribirse(estudianteId: number, cursoId: number): Observable<any> {
    return this.http.delete<any>(`estudiante/${estudianteId}/cursos/${cursoId}`);
  }

  misActividades(estudianteId: number): Observable<ActividadEstudiante[]> {
    return this.http.get<ActividadEstudiante[]>(`estudiante/${estudianteId}/actividades`);
  }

  misNotas(estudianteId: number): Observable<NotaEstudiante[]> {
    return this.http.get<NotaEstudiante[]>(`estudiante/${estudianteId}/notas`);
  }

  subirEntrega(actividadId: number, estudianteId: number, archivo: File): Observable<any> {
    const form = new FormData();
    form.append('archivo', archivo);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.httpClient.post<any>(
      `${environment.apiUrl}/docente/actividades/${actividadId}/entregas/${estudianteId}`,
      form,
      { headers }
    );
  }
}