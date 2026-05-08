import { Routes } from '@angular/router';
import { AuthGuardian } from './nucleo/guardianes/auth.guardian';

export const routes: Routes = [
  {
  path: 'usuarios',
  canActivate: [AuthGuardian],
  loadComponent: () =>
    import('./funcionalidades/usuarios/presentacion/paginas/usuarios-lista/usuarios-lista.pagina')
      .then(m => m.UsuariosListaPagina)
},
{
  path: 'materias',
  canActivate: [AuthGuardian],
  loadComponent: () =>
    import('./funcionalidades/materias/presentacion/paginas/materias-lista/materias-lista.pagina')
      .then(m => m.MateriasListaPagina)
},
  {
    path: '',
    redirectTo: 'autenticacion/login',
    pathMatch: 'full'
  },
  {
    path: 'autenticacion',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./funcionalidades/autenticacion/presentacion/paginas/login/login.pagina')
            .then(m => m.LoginPagina)
      }
    ]
  },
  {
    path: 'inicio',
    canActivate: [AuthGuardian],
    loadComponent: () =>
      import('./funcionalidades/usuarios/presentacion/paginas/inicio/inicio.pagina')
        .then(m => m.InicioPagina)
  },
  {
    path: '**',
    redirectTo: 'autenticacion/login'
  }
];
