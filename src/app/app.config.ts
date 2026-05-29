import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptor } from './nucleo/interceptores/jwt.interceptor';
import { AutenticacionAdaptador } from './funcionalidades/autenticacion/infraestructura/adaptadores/salida/autenticacion.adaptador';
import { AUTENTICACION_SALIDA_PUERTO } from './funcionalidades/autenticacion/dominio/puertos/salida/autenticacion-salida.puerto';
import { routes } from './app.routes';
import { UsuariosAdaptador } from './funcionalidades/usuarios/infraestructura/adaptadores/salida/usuarios.adaptador';
import { USUARIOS_SALIDA_PUERTO } from './funcionalidades/usuarios/dominio/puertos/salida/usuarios-salida.puerto';
import { MateriasAdaptador } from './funcionalidades/materias/infraestructura/adaptadores/salida/materias.adaptador';
import { MATERIAS_SALIDA_PUERTO } from './funcionalidades/materias/dominio/puertos/salida/materias-salida.puerto';
import { NotasAdaptador } from './funcionalidades/notas/infraestructura/adaptadores/salida/notas.adaptador';
import { NOTAS_SALIDA_PUERTO } from './funcionalidades/notas/dominio/puertos/salida/notas-salida.puerto';
import { EstudianteAdaptador } from './funcionalidades/estudiante/infraestructura/adaptadores/salida/estudiante.adaptador';
import { ESTUDIANTE_SALIDA_PUERTO } from './funcionalidades/estudiante/dominio/puertos/salida/estudiante-salida.puerto';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: NOTAS_SALIDA_PUERTO,
      useClass: NotasAdaptador
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: AUTENTICACION_SALIDA_PUERTO,
      useClass: AutenticacionAdaptador
    },
    {
      provide: USUARIOS_SALIDA_PUERTO,
      useClass: UsuariosAdaptador
    },
    {
      provide: MATERIAS_SALIDA_PUERTO,
      useClass: MateriasAdaptador
    },
    {
      provide: ESTUDIANTE_SALIDA_PUERTO,
      useClass: EstudianteAdaptador
    }
  ]
};