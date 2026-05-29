import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ESTUDIANTE_SALIDA_PUERTO, EstudianteSalidaPuerto } from '../../../dominio/puertos/salida/estudiante-salida.puerto';
import { ActividadEstudiante } from '../../../dominio/modelos/actividad-estudiante.modelo';

interface ActividadVista extends ActividadEstudiante {
  vencida: boolean;
  colorBorde: string;
}

@Component({
  selector: 'app-mis-actividades',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatChipsModule
  ],
  templateUrl: './mis-actividades.pagina.html'
})
export class MisActividadesPagina implements OnInit {

  estudianteId = 0;
  actividades: ActividadVista[] = [];
  cargando = false;
  actividadSubiendo: number | null = null;
  archivoSeleccionado: File | null = null;
  subiendoArchivo = false;

  constructor(
    @Inject(ESTUDIANTE_SALIDA_PUERTO) private puerto: EstudianteSalidaPuerto,
    private snack: MatSnackBar
  ) {
    const raw = localStorage.getItem('sesion');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const sesion = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
        this.estudianteId = Number(sesion?.id ?? 0);
      } catch { }
    }
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.actividades = [];
    this.puerto.misActividades(this.estudianteId).subscribe({
      next: (actividades: ActividadEstudiante[]) => {
        this.actividades = actividades.map(a => ({
          ...a,
          vencida: new Date(a.fechaEntrega) < new Date(),
          colorBorde: new Date(a.fechaEntrega) < new Date()
            ? '4px solid #EF4444'
            : '4px solid #7C3AED'
        }));
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.snack.open('Error cargando actividades', 'Cerrar', { duration: 3000 });
      }
    });
  }

  abrirSubida(actividadId: number): void {
    this.actividadSubiendo = actividadId;
    this.archivoSeleccionado = null;
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  subirArchivo(): void {
    if (!this.archivoSeleccionado || !this.actividadSubiendo) return;
    this.subiendoArchivo = true;
    this.puerto.subirEntrega(this.actividadSubiendo, this.estudianteId, this.archivoSeleccionado).subscribe({
      next: () => {
        this.snack.open('Archivo entregado correctamente', 'Cerrar', { duration: 3000 });
        this.actividadSubiendo = null;
        this.archivoSeleccionado = null;
        this.subiendoArchivo = false;
      },
      error: () => {
        this.subiendoArchivo = false;
        this.snack.open('Error al subir el archivo', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancelarSubida(): void {
    this.actividadSubiendo = null;
    this.archivoSeleccionado = null;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'Sin fecha';
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}