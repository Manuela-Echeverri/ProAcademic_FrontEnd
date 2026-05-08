import { Component, Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MATERIAS_SALIDA_PUERTO, MateriasSalidaPuerto } from '../../../dominio/puertos/salida/materias-salida.puerto';
import { Materia } from '../../../dominio/modelos/materia.modelo';

@Component({
  selector: 'app-materias-lista',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './materias-lista.pagina.html'
})
export class MateriasListaPagina implements OnInit {

  materias: Materia[] = [];
  cargando = false;
  columnas = ['codigo', 'nombre', 'descripcion', 'creditos', 'activa', 'acciones'];

  constructor(
    @Inject(MATERIAS_SALIDA_PUERTO) private puerto: MateriasSalidaPuerto,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void {
    this.cargando = true;
    this.puerto.obtenerTodas().subscribe({
      next: (materias: Materia[]) => {
        this.materias = materias;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.snackBar.open('Error al cargar materias', 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminar(id: number): void {
    this.puerto.eliminar(id).subscribe({
      next: () => {
        this.snackBar.open('Materia eliminada', 'Cerrar', { duration: 3000 });
        this.cargarMaterias();
      },
      error: () => {
        this.snackBar.open('Error al eliminar materia', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
