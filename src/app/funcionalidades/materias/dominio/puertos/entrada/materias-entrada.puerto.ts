import { Observable } from 'rxjs';
import { Materia } from '../../modelos/materia.modelo';
import { CrearMateria } from '../../modelos/crear-materia.modelo';

export interface MateriasEntradaPuerto {
  obtenerTodas(): Observable<Materia[]>;
  obtenerPorId(id: number): Observable<Materia>;
  crear(materia: CrearMateria): Observable<Materia>;
  actualizar(id: number, materia: Partial<Materia>): Observable<Materia>;
  eliminar(id: number): Observable<void>;
}
