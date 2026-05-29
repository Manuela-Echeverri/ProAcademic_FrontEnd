import { Routes } from '@angular/router';
import { AuthGuardian } from './nucleo/guardianes/auth.guardian';

export const routes: Routes = [
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

  // ADMIN
  {
    path: 'admin',
    canActivate: [AuthGuardian],

    loadComponent: () =>
      import('./funcionalidades/usuarios/presentacion/paginas/inicio/inicio.pagina')
        .then(m => m.InicioPagina),

    children: [

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./funcionalidades/usuarios/presentacion/paginas/usuarios-lista/usuarios-lista.pagina')
            .then(m => m.UsuariosListaPagina)
      },

      {
        path: 'materias',
        loadComponent: () =>
          import('./funcionalidades/materias/presentacion/paginas/materias-lista/materias-lista.pagina')
            .then(m => m.MateriasListaPagina)
      },

      {
        path: 'notas',
        loadComponent: () =>
          import('./funcionalidades/notas/presentacion/paginas/notas-lista/notas-lista.pagina')
            .then(m => m.NotasListaPagina)
      },

      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'materias',
    canActivate: [AuthGuardian],
    loadComponent: () =>
      import('./funcionalidades/materias/presentacion/paginas/materias-lista/materias-lista.pagina')
        .then(m => m.MateriasListaPagina)
  },

  // DOCENTE
  {
    path: 'docente',
    canActivate: [AuthGuardian],

    loadComponent: () =>
      import('./funcionalidades/docente/presentacion/paginas/docente-inicio/docente-inicio.pagina')
        .then(m => m.DocenteInicioPagina),

    children: [
      {
        path: 'cursos',
        loadComponent: () =>
          import('./funcionalidades/docente/presentacion/paginas/docente-cursos/docente-cursos.pagina')
            .then(m => m.DocenteCursosPagina)
      },

      {
        path: 'cursos/:cursoId/detalle',
        loadComponent: () =>
          import('./funcionalidades/docente/presentacion/paginas/docente-actividades/docente-detalle.pagina')
            .then(m => m.DocenteDetallePagina)
      },

      {
        path: '',
        redirectTo: 'cursos',
        pathMatch: 'full'
      }
    ]
  },

  // ESTUDIANTE
  {
    path: 'estudiante',
    canActivate: [AuthGuardian],

    loadComponent: () =>
      import('./funcionalidades/estudiante/presentacion/paginas/estudiante-inicio/estudiante-inicio.pagina')
        .then(m => m.EstudianteInicioPagina),

    children: [
      {
        path: 'cursos',
        loadComponent: () =>
          import('./funcionalidades/estudiante/presentacion/paginas/mis-cursos/mis-cursos.pagina')
            .then(m => m.MisCursosPagina)
      },

      {
        path: 'actividades',
        loadComponent: () =>
          import('./funcionalidades/estudiante/presentacion/paginas/mis-actividades/mis-actividades.pagina')
            .then(m => m.MisActividadesPagina)
      },

      {
        path: 'notas',
        loadComponent: () =>
          import('./funcionalidades/estudiante/presentacion/paginas/mis-notas/mis-notas.pagina')
            .then(m => m.MisNotasPagina)
      },

      {
        path: '',
        redirectTo: 'cursos',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'autenticacion/login'
  }
];