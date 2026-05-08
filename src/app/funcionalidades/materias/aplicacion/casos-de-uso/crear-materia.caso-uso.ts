import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MATERIAS_SALIDA_PUERTO, MateriasSalidaPuerto } from '../../dominio/puertos/salida/materias-salida.puerto';
import { Materia } from '../../dominio/modelos/materia.modelo';
import { CrearMateria } from '../../dominio/modelos/crear-materia.modelo';

@Injectable({
  providedIn: 'root'
})
export class CrearMateriaCasoUso {

  constructor(
    @Inject(MATERIAS_SALIDA_PUERTO) private puerto: MateriasSalidaPuerto
  ) {}

  ejecutar(materia: CrearMateria): Observable<Materia> {
    return this.puerto.crear(materia);
  }
}
