import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MateriasAdaptador } from '../../../infraestructura/adaptadores/salida/materias.adaptador';

import { Materia } from '../../../dominio/modelos/materia.modelo';

@Component({
  selector: 'app-materias-lista',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],

  templateUrl: './materias-lista.pagina.html'
})

export class MateriasListaPagina implements OnInit {

  private servicio = inject(MateriasAdaptador);

  private fb = inject(FormBuilder);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Materia>([]);

  columnas: string[] = [
    'nombre',
    'descripcion',
    'acciones'
  ];

  mostrarFormulario = false;

  editando = false;

  materiaId = 0;

  formulario = this.fb.group({

    nombre: ['', Validators.required],

    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {

    this.cargarMaterias();
  }

  cargarMaterias(): void {

    this.servicio.listar()

      .subscribe({

        next: (data: Materia[]) => {

          this.dataSource.data = data;

          this.dataSource.paginator =
            this.paginator;
        },

        error: (error) => {

          console.error(
            'Error cargando materias',
            error
          );
        }
      });
  }

  abrirFormularioNuevo(): void {

    this.editando = false;

    this.mostrarFormulario = true;

    this.formulario.reset();
  }

  abrirFormularioEditar(
    materia: Materia
  ): void {

    this.editando = true;

    this.mostrarFormulario = true;

    this.materiaId = materia.id!;

    this.formulario.patchValue({

      nombre: materia.nombre,

      descripcion: materia.descripcion
    });
  }

  guardar(): void {

    if (this.formulario.invalid) return;

    const materia: Materia = {

      nombre:
        this.formulario.value.nombre ?? '',

      descripcion:
        this.formulario.value.descripcion ?? ''
    };

    if (this.editando) {

      this.servicio
        .actualizar(this.materiaId, materia)

        .subscribe({

          next: () => {

            this.cargarMaterias();

            this.cerrarFormulario();
          },

          error: (error) => {

            console.error(
              'Error actualizando materia',
              error
            );
          }
        });

    } else {

      this.servicio
        .crear(materia)

        .subscribe({

          next: () => {

            this.cargarMaterias();

            this.cerrarFormulario();
          },

          error: (error) => {

            console.error(
              'Error creando materia',
              error
            );
          }
        });
    }
  }

  eliminar(id: number): void {

    if (!confirm('¿Eliminar materia?')) return;

    this.servicio
      .eliminar(id)

      .subscribe({

        next: () => {

          this.cargarMaterias();
        },

        error: (error) => {

          console.error(
            'Error eliminando materia',
            error
          );
        }
      });
  }

  cerrarFormulario(): void {

    this.mostrarFormulario = false;

    this.formulario.reset();
  }

  imprimirPDF(): void {

    window.open(

      'http://localhost:9090/reportes/materias/pdf',

      '_blank'
    );
  }
}