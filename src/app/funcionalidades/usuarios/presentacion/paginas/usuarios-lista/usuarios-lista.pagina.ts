import { Component, Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { USUARIOS_SALIDA_PUERTO, UsuariosSalidaPuerto } from '../../../dominio/puertos/salida/usuarios-salida.puerto';
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
    MatProgressSpinnerModule
  ],
  templateUrl: './usuarios-lista.pagina.html'
})
export class UsuariosListaPagina implements OnInit {

  usuarios: Usuario[] = [];
  cargando = false;
  columnas = ['nombre', 'apellido', 'correo', 'rol', 'activo', 'acciones'];

  constructor(
    @Inject(USUARIOS_SALIDA_PUERTO) private puerto: UsuariosSalidaPuerto,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.puerto.obtenerTodos().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminar(id: number): void {
    this.puerto.eliminar(id).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
        this.cargarUsuarios();
      },
      error: () => {
        this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
