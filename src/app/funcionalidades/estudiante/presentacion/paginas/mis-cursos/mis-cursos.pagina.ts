import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../../dominio/puertos/salida/estudiante-salida.puerto';
import { CursoEstudiante } from '../../../dominio/modelos/curso-estudiante.modelo';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './mis-cursos.pagina.html'
})
export class MisCursosPagina implements OnInit {

estudianteId = typeof window !== 'undefined'
  ? Number(JSON.parse(localStorage.getItem('userId') ?? '0'))
  : 0;
  misCursos: CursoEstudiante[] = [];
  cursosDisponibles: CursoEstudiante[] = [];
  cargandoInscritos = false;
  cargandoDisponibles = false;
  tabActivo = 'disponibles';

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto,
    private snack: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMisCursos();
    this.cargarDisponibles();
  }

  cargarMisCursos(): void {
    this.cargandoInscritos = true;
    this.puerto.misInscripciones(this.estudianteId).subscribe({
      next: (cursos: CursoEstudiante[]) => {
        this.misCursos = cursos;
        this.cargandoInscritos = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoInscritos = false;
        this.cdr.detectChanges();
        this.snack.open('Error cargando mis cursos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarDisponibles(): void {
    this.cargandoDisponibles = true;
    this.puerto.cursosDisponibles().subscribe({
      next: (cursos: CursoEstudiante[]) => {
        this.cursosDisponibles = cursos;
        this.cargandoDisponibles = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoDisponibles = false;
        this.snack.open('Error cargando cursos disponibles', 'Cerrar', { duration: 3000 });
      }
    });
  }

  inscribirse(cursoId: number): void {
    this.puerto.inscribirse(this.estudianteId, cursoId).subscribe({
      next: () => {
        this.snack.open('Inscripción exitosa', 'Cerrar', { duration: 3000 });
        this.tabActivo = 'inscritos';
        this.cargarMisCursos();
        this.cargarDisponibles();
      },
      error: (err: any) => {
        const msg = err?.error?.error || 'Error al inscribirse';
        this.snack.open(msg, 'Cerrar', { duration: 3000 });
      }
    });
  }

  desinscribirse(cursoId: number): void {
    this.puerto.desinscribirse(this.estudianteId, cursoId).subscribe({
      next: () => {
        this.snack.open('Desinscripción exitosa', 'Cerrar', { duration: 3000 });
        this.cargarMisCursos();
        this.cargarDisponibles();
      },
      error: () => this.snack.open('Error al desinscribirse', 'Cerrar', { duration: 3000 })
    });
  }

  estaInscrito(cursoId: number): boolean {
    return this.misCursos.some(c => c.id === cursoId);
  }
}