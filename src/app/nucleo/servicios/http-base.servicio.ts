import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseServicio {

  private urlBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private obtenerEncabezados(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  get<T>(ruta: string): Observable<T> {
    return this.http.get<T>(`${this.urlBase}/${ruta}`, {
      headers: this.obtenerEncabezados()
    });
  }

  post<T>(ruta: string, cuerpo: any): Observable<T> {
    return this.http.post<T>(`${this.urlBase}/${ruta}`, cuerpo, {
      headers: this.obtenerEncabezados()
    });
  }

  put<T>(ruta: string, cuerpo: any): Observable<T> {
    return this.http.put<T>(`${this.urlBase}/${ruta}`, cuerpo, {
      headers: this.obtenerEncabezados()
    });
  }

  delete<T>(ruta: string): Observable<T> {
    return this.http.delete<T>(`${this.urlBase}/${ruta}`, {
      headers: this.obtenerEncabezados()
    });
  }
}