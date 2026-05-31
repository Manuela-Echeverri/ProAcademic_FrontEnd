import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../dominio/puertos/salida/estudiante-salida.puerto';
import { NotaEstudiante } from '../../dominio/modelos/nota-estudiante.modelo';

@Injectable({ providedIn: 'root' })
export class ObtenerMisNotasCasoUso {

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto
  ) {}

  ejecutar(estudianteId: number): Observable<NotaEstudiante[]> {
    return this.puerto.misNotas(estudianteId);
  }
}