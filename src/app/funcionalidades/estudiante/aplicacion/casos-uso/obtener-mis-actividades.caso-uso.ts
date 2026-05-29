import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../dominio/puertos/salida/estudiante-salida.puerto';
import { ActividadEstudiante } from '../../dominio/modelos/actividad-estudiante.modelo';

@Injectable({ providedIn: 'root' })
export class ObtenerMisActividadesCasoUso {

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto
  ) {}

  ejecutar(estudianteId: number): Observable<ActividadEstudiante[]> {
    return this.puerto.misActividades(estudianteId);
  }
}