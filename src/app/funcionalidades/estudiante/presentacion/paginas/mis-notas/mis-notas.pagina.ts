import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../../dominio/puertos/salida/estudiante-salida.puerto';
import { NotaEstudiante } from '../../../dominio/modelos/nota-estudiante.modelo';

@Component({
  selector: 'app-mis-notas',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './mis-notas.pagina.html'
})
export class MisNotasPagina implements OnInit {

  estudianteId = (() => {
    const raw = localStorage.getItem('sesion');
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    const sesion = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
    return Number(sesion?.id ?? 0);
  })();

  notas: NotaEstudiante[] = [];
  cargando = false;
  columnas = ['curso', 'valor', 'estado', 'observacion'];

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.puerto.misNotas(this.estudianteId).subscribe({
      next: (notas: NotaEstudiante[]) => {
        this.notas = notas;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
        this.snack.open('Error cargando notas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  obtenerEstado(valor: number): string {
    if (valor >= 4.5) return 'Excelente';
    if (valor >= 4.0) return 'Sobresaliente';
    if (valor >= 3.5) return 'Aceptable';
    if (valor >= 3.0) return 'Aprobado';
    return 'Reprobado';
  }

  obtenerColor(valor: number): string {
    if (valor >= 4.0) return '#16A34A';
    if (valor >= 3.0) return '#D97706';
    return '#EF4444';
  }

  obtenerPromedio(): string {
    if (this.notas.length === 0) return '0.0';
    const suma = this.notas.reduce((acc, n) => acc + n.valor, 0);
    return (suma / this.notas.length).toFixed(1);
  }
}