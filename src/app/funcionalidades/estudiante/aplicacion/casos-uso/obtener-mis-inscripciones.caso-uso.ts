import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../dominio/puertos/salida/estudiante-salida.puerto';
import { CursoEstudiante } from '../../dominio/modelos/curso-estudiante.modelo';

@Injectable({ providedIn: 'root' })
export class ObtenerMisInscripcionesCasoUso {

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto
  ) {}

  ejecutar(estudianteId: number): Observable<CursoEstudiante[]> {
    return this.puerto.misInscripciones(estudianteId);
  }
}