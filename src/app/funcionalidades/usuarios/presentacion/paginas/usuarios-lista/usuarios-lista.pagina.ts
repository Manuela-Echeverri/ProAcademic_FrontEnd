import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  USUARIOS_SALIDA_PUERTO,
  UsuariosSalidaPuerto
} from '../../../dominio/puertos/salida/usuarios-salida.puerto';

import { Usuario } from '../../../dominio/modelos/usuario.modelo';

@Component({
  selector: 'app-usuarios-lista',

  standalone: true,

  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],

  templateUrl: './usuarios-lista.pagina.html'
})

export class UsuariosListaPagina implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource =
    new MatTableDataSource<Usuario>([]);

  cargando = false;

  columnas = [
    'nombre',
    'apellido',
    'correo',
    'rol',
    'acciones'
  ];

  mostrarFormulario = false;

  editando = false;

  usuarioSeleccionadoId: number | null = null;

  formulario: FormGroup;

  constructor(

    @Inject(USUARIOS_SALIDA_PUERTO)
    private puerto: UsuariosSalidaPuerto,

    private snackBar: MatSnackBar,

    private fb: FormBuilder

  ) {

    this.formulario = this.fb.group({

      nombre: ['', Validators.required],

      apellido: ['', Validators.required],

      correo: [
        '',
        [Validators.required, Validators.email]
      ],

      usuario: ['', Validators.required],

      contrasena: [''],

      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    this.cargando = true;

    this.puerto.obtenerTodos()

      .subscribe({

        next: (usuarios: Usuario[]) => {

          this.dataSource.data = usuarios;

          this.dataSource.paginator =
            this.paginator;

          this.cargando = false;
        },

        error: () => {

          this.cargando = false;

          this.snackBar.open(
            'Error al cargar usuarios',
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
  }

  abrirFormularioNuevo(): void {

    this.editando = false;

    this.usuarioSeleccionadoId = null;

    this.formulario.reset();

    this.formulario
      .get('contrasena')

      ?.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);

    this.formulario
      .get('contrasena')

      ?.updateValueAndValidity();

    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(
    usuario: Usuario
  ): void {

    this.editando = true;

    this.usuarioSeleccionadoId =
      usuario.id;

    this.formulario
      .get('contrasena')

      ?.clearValidators();

    this.formulario
      .get('contrasena')

      ?.updateValueAndValidity();

    this.formulario.patchValue({

      nombre: usuario.nombre,

      apellido: usuario.apellido,

      correo: usuario.correo,

      usuario: (usuario as any).usuario,

      contrasena: '',

      rol: usuario.rol
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

    if (
      this.editando &&
      this.usuarioSeleccionadoId
    ) {

      this.puerto
        .actualizar(
          this.usuarioSeleccionadoId,
          datos
        )

        .subscribe({

          next: () => {

            this.snackBar.open(
              'Usuario actualizado',
              'Cerrar',
              { duration: 3000 }
            );

            this.cerrarFormulario();

            this.cargarUsuarios();
          },

          error: () => {

            this.snackBar.open(
              'Error al actualizar usuario',
              'Cerrar',
              { duration: 3000 }
            );
          }
        });

    } else {

      this.puerto
        .crear(datos)

        .subscribe({

          next: () => {

            this.snackBar.open(
              'Usuario creado',
              'Cerrar',
              { duration: 3000 }
            );

            this.cerrarFormulario();

            this.cargarUsuarios();
          },

          error: () => {

            this.snackBar.open(
              'Error al crear usuario',
              'Cerrar',
              { duration: 3000 }
            );
          }
        });
    }
  }

  eliminar(id: number): void {

    this.puerto
      .eliminar(id)

      .subscribe({

        next: () => {

          this.snackBar.open(
            'Usuario eliminado',
            'Cerrar',
            { duration: 3000 }
          );

          this.cargarUsuarios();
        },

        error: () => {

          this.snackBar.open(
            'Error al eliminar usuario',
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
  }

  imprimirPDF(): void {

    window.open(

      'http://localhost:9090/reportes/estudiantes/pdf?curso=General',

      '_blank'
    );
  }
}