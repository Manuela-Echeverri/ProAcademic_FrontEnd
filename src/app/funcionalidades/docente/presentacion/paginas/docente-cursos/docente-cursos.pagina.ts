import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DocenteAdaptador } from '../../../infraestructura/adaptadores/salida/docente.adaptador';
import { Curso } from '../../../dominio/modelos/docente.modelos';

@Component({
  selector: 'app-docente-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatSnackBarModule],
  templateUrl: './docente-cursos.pagina.html'
})
export class DocenteCursosPagina implements OnInit {

  private servicio = inject(DocenteAdaptador);
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  sesion = JSON.parse(localStorage.getItem('sesion') || '{}');

  docenteId = Number(this.sesion.id);
  cursos: Curso[] = [];
  materias: any[] = [];
  mostrarForm = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    periodo: ['', Validators.required],
    materiaId: [null as number | null, Validators.required]
  });

  ngOnInit(): void {

    if (!this.docenteId || this.docenteId === 0) {
      console.error('No se encontró el ID del docente');
      return;
    }

    this.cargar();
    this.cargarMaterias();
  }

  cargar() {
    this.servicio.cursos(this.docenteId).subscribe({
      next: data => this.cursos = data,
      error: () => this.snack.open('Error cargando cursos', 'Cerrar', { duration: 3000 })
    });
  }

  cargarMaterias() {
    this.servicio.materias().subscribe({
      next: data => this.materias = data,
      error: () => this.snack.open('Error cargando materias', 'Cerrar', { duration: 3000 })
    });
  }

  guardar() {
    if (this.form.invalid) return;
    const curso: Curso = { ...this.form.value as any, docenteId: this.docenteId };
    this.servicio.crearCurso(curso).subscribe({
      next: () => {
        this.snack.open('Curso creado', 'Cerrar', { duration: 3000 });
        this.mostrarForm = false;
        this.form.reset();
        this.cargar();
      },
      error: () => this.snack.open('Error creando curso', 'Cerrar', { duration: 3000 })
    });
  }

  verCurso(curso: Curso) {
    this.router.navigate(['/docente/cursos', curso.id, 'detalle']);
  }
}