export interface Paginacion<T> {
  contenido: T[];
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
  tamanioPagina: number;
}
