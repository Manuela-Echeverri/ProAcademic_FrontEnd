import { Component, Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './materias-lista.pagina.html'
})
export class MateriasListaPagina implements OnInit {

  materias: Materia[] = [];
  cargando = false;
  columnas = ['nombre', 'descripcion', 'acciones'];
  mostrarFormulario = false;
  editando = false;
  materiaSeleccionadaId: number | null = null;

  formulario: FormGroup;

  constructor(
    @Inject(MATERIAS_SALIDA_PUERTO) private puerto: MateriasSalidaPuerto,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

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

  abrirFormularioNuevo(): void {
    this.editando = false;
    this.materiaSeleccionadaId = null;
    this.formulario.reset();
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(materia: Materia): void {
    this.editando = true;
    this.materiaSeleccionadaId = materia.id;
    this.formulario.patchValue({
      nombre: materia.nombre,
      descripcion: materia.descripcion
    });
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.formulario.reset();
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;

    if (this.editando && this.materiaSeleccionadaId) {
      this.puerto.actualizar(this.materiaSeleccionadaId, datos).subscribe({
        next: () => {
          this.snackBar.open('Materia actualizada', 'Cerrar', { duration: 3000 });
          this.cerrarFormulario();
          this.cargarMaterias();
        },
        error: () => {
          this.snackBar.open('Error al actualizar materia', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.puerto.crear(datos).subscribe({
        next: () => {
          this.snackBar.open('Materia creada', 'Cerrar', { duration: 3000 });
          this.cerrarFormulario();
          this.cargarMaterias();
        },
        error: () => {
          this.snackBar.open('Error al crear materia', 'Cerrar', { duration: 3000 });
        }
      });
    }
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