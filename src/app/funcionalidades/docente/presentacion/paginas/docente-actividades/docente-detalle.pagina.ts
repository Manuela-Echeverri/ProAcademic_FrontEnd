import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DocenteAdaptador } from '../../../infraestructura/adaptadores/salida/docente.adaptador';
import { Actividad, Entrega, Nota } from '../../../dominio/modelos/docente.modelos';

@Component({
  selector: 'app-docente-detalle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './docente-detalle.pagina.html'
})
export class DocenteDetallePagina implements OnInit {

  private servicio  = inject(DocenteAdaptador);
  private route     = inject(ActivatedRoute);
  private snack     = inject(MatSnackBar);
  private fb        = inject(FormBuilder);

  cursoId   = Number(this.route.snapshot.paramMap.get('cursoId'));
  docenteId = Number(JSON.parse(localStorage.getItem('sesion') || '{}')?.id ?? 0);

  // Tab activo
  tabActivo = 'estudiantes';

  // Estudiantes
  estudiantes: any[] = [];
  colEstudiantes = ['nombre', 'apellido', 'correo'];

  // Actividades
  actividades: Actividad[] = [];
  colActividades = ['titulo', 'fechaEntrega', 'valorMaximo', 'acciones'];
  mostrarFormActividad = false;
  editandoActividad = false;
  actividadEditandoId: number | null = null;

  formActividad = this.fb.group({
    titulo:       ['', Validators.required],
    descripcion:  [''],
    fechaEntrega: ['', Validators.required],
    valorMaximo:  [10, [Validators.required, Validators.min(0)]]
  });

  // Entregas
  entregas: Entrega[] = [];
  actividadSeleccionada: Actividad | null = null;
  colEntregas = ['estudianteNombre', 'archivoNombre', 'fechaEntrega', 'calificacion', 'acciones'];

  // Comentario
  entregaComentando: Entrega | null = null;
  formComentario = this.fb.group({
    comentarioDocente: [''],
    calificacion: [null as number | null, Validators.min(0)]
  });

  // Notas
  notas: Nota[] = [];
  colNotas = ['estudianteNombre', 'valor', 'observacion', 'acciones'];
  notaEditandoId: number | null = null;
  formNota = this.fb.group({
    valor:       [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
    observacion: ['']
  });

  ngOnInit() {
    this.cargarEstudiantes();
    this.cargarActividades();
    this.cargarNotas();
  }

  cargarEstudiantes() {
    this.servicio.estudiantes(this.cursoId).subscribe({
      next: data => this.estudiantes = data,
      error: () => this.snack.open('Error cargando estudiantes', 'Cerrar', { duration: 3000 })
    });
  }

  cargarActividades() {
    this.servicio.actividades(this.cursoId).subscribe({
      next: data => this.actividades = data,
      error: () => this.snack.open('Error cargando actividades', 'Cerrar', { duration: 3000 })
    });
  }

  abrirFormActividad(actividad?: Actividad) {
    this.editandoActividad = !!actividad;
    this.actividadEditandoId = actividad?.id ?? null;
    this.formActividad.reset({ valorMaximo: 10 });
    if (actividad) this.formActividad.patchValue(actividad as any);
    this.mostrarFormActividad = true;
  }

  guardarActividad() {
    if (this.formActividad.invalid) return;
    const a: Actividad = { ...this.formActividad.value as any, cursoId: this.cursoId, docenteId: this.docenteId };
    const op = this.editandoActividad && this.actividadEditandoId
      ? this.servicio.actualizarActividad(this.actividadEditandoId, a)
      : this.servicio.crearActividad(a);
    op.subscribe({
      next: () => {
        this.mostrarFormActividad = false;
        this.cargarActividades();
        this.snack.open('Actividad guardada', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snack.open('Error guardando actividad', 'Cerrar', { duration: 3000 })
    });
  }

  eliminarActividad(id: number) {
    if (!confirm('¿Eliminar actividad?')) return;
    this.servicio.eliminarActividad(id).subscribe({
      next: () => { this.cargarActividades(); this.snack.open('Eliminada', 'Cerrar', { duration: 3000 }); },
      error: () => this.snack.open('Error eliminando', 'Cerrar', { duration: 3000 })
    });
  }

  verEntregas(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
    this.tabActivo = 'entregas';
    this.servicio.entregas(actividad.id!).subscribe({
      next: data => this.entregas = data,
      error: () => this.snack.open('Error cargando entregas', 'Cerrar', { duration: 3000 })
    });
  }

  abrirComentario(entrega: Entrega) {
    this.entregaComentando = entrega;
    this.formComentario.patchValue({
      comentarioDocente: entrega.comentarioDocente ?? '',
      calificacion: entrega.calificacion ?? null
    });
  }

  guardarComentario() {
    if (!this.entregaComentando) return;
    const { comentarioDocente, calificacion } = this.formComentario.value;
    this.servicio.comentar(this.entregaComentando.id!, comentarioDocente ?? '', calificacion ?? 0).subscribe({
      next: () => {
        this.snack.open('Comentario guardado', 'Cerrar', { duration: 3000 });
        this.entregaComentando = null;
        if (this.actividadSeleccionada) this.verEntregas(this.actividadSeleccionada);
      },
      error: () => this.snack.open('Error guardando comentario', 'Cerrar', { duration: 3000 })
    });
  }

  cargarNotas() {
    this.servicio.notas(this.cursoId).subscribe({
      next: data => this.notas = data,
      error: () => this.snack.open('Error cargando notas', 'Cerrar', { duration: 3000 })
    });
  }

  editarNota(nota: Nota) {
    this.notaEditandoId = nota.id!;
    this.formNota.patchValue({ valor: nota.valor, observacion: nota.observacion ?? '' });
  }

  guardarNota() {
    if (this.formNota.invalid || !this.notaEditandoId) return;
    const { valor, observacion } = this.formNota.value;
    this.servicio.actualizarNota(this.notaEditandoId, valor!, observacion ?? '').subscribe({
      next: () => {
        this.notaEditandoId = null;
        this.cargarNotas();
        this.snack.open('Nota actualizada', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snack.open('Error guardando nota', 'Cerrar', { duration: 3000 })
    });
  }

  getControl(name: string) {
    return this.formNota.get(name) as FormControl;
  }
}