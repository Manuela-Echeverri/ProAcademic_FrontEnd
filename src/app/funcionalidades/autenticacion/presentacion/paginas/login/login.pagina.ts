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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  onFocus(event: FocusEvent): void {
    const wrapper = (event.target as HTMLElement).parentElement;
    if (wrapper) {
      wrapper.style.borderColor = '#7C3AED';
      wrapper.style.background = 'white';
    }
  }

  onBlur(event: FocusEvent): void {
    const wrapper = (event.target as HTMLElement).parentElement;
    if (wrapper) {
      wrapper.style.borderColor = '#EDE9FE';
      wrapper.style.background = '#F5F3FF';
    }
  }

  onMouseOver(event: MouseEvent): void {
    (event.currentTarget as HTMLElement).style.opacity = '0.9';
  }

  onMouseOut(event: MouseEvent): void {
    (event.currentTarget as HTMLElement).style.opacity = '1';
  }

  alEnviar(): void {
    if (this.formulario.invalid) return;

    this.cargando = true;
    this.error = '';

    this.puerto.login(this.formulario.value).pipe(
      timeout(10000), // 10 segundos máximo
      catchError((err) => {
        this.cargando = false;
        this.error = err?.name === 'TimeoutError'
          ? 'El servidor tardó demasiado. Intenta de nuevo.'
          : 'Correo o contraseña incorrectos';
        return throwError(() => err);
      })
    ).subscribe({
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
      error: () => {} // ya manejado en catchError
    });
  }
}