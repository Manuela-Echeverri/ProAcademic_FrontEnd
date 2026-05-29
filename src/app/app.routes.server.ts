import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'autenticacion/login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'estudiante/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'docente/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'inicio',
    renderMode: RenderMode.Client
  },
  {
    path: 'usuarios',
    renderMode: RenderMode.Client
  },
  {
    path: 'materias',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];