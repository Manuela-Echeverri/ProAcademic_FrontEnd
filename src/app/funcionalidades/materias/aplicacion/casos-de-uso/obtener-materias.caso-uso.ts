import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MATERIAS_SALIDA_PUERTO, MateriasSalidaPuerto } from '../../dominio/puertos/salida/materias-salida.puerto';
import { Materia } from '../../dominio/modelos/materia.modelo';

@Injectable({
  providedIn: 'root'
})
export class ObtenerMateriasCasoUso {

  constructor(
    @Inject(MATERIAS_SALIDA_PUERTO) private puerto: MateriasSalidaPuerto
  ) {}

  ejecutar(): Observable<Materia[]> {
    return this.puerto.obtenerTodas();
  }
}
