import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlmacenamientoServicio } from '../../../../../nucleo/servicios/almacenamiento.servicio';
import { AUTENTICACION_SALIDA_PUERTO, AutenticacionSalidaPuerto } from '../../../dominio/puertos/salida/autenticacion-salida.puerto';
import { CargandoComponente } from '../../../../../compartido/componentes/cargando/cargando.componente';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-pagina',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.pagina.html'
})
export class LoginPagina {

  formulario: FormGroup;
  cargando = false;
  mostrarContrasena = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    @Inject(AUTENTICACION_SALIDA_PUERTO) private puerto: AutenticacionSalidaPuerto,
    private almacenamiento: AlmacenamientoServicio,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  alEnviar(): void {
    if (this.formulario.invalid) return;

    this.cargando = true;
    this.error = '';

    this.puerto.login(this.formulario.value).subscribe({
      next: (sesion: any) => {
        this.almacenamiento.guardar('token', sesion.token);
        this.almacenamiento.guardar('sesion', sesion);
        this.almacenamiento.guardar('userId', sesion.id);
        this.cargando = false;

        const rol = sesion.rol?.toUpperCase();
        if (rol === 'DOCENTE') {
          this.router.navigate(['/docente/cursos']);
        } else if (rol === 'ESTUDIANTE') {
          this.router.navigate(['/estudiante/cursos']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}