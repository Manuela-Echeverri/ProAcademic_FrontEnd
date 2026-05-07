import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptor } from './nucleo/interceptores/jwt.interceptor';
import { AutenticacionAdaptador } from './funcionalidades/autenticacion/infraestructura/adaptadores/salida/autenticacion.adaptador';
import { AUTENTICACION_SALIDA_PUERTO } from './funcionalidades/autenticacion/dominio/puertos/salida/autenticacion-salida.puerto';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: AUTENTICACION_SALIDA_PUERTO,
      useClass: AutenticacionAdaptador
    }
  ]
};
