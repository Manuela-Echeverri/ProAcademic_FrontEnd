export interface ErrorApi {
  mensaje: string;
  codigo: number;
  errores?: string[];
  timestamp?: string;
}
