export interface Sesion {
  token: string;
  tipo: string;
  correo: string;
  nombre: string;
  rol: string;
  expiracion: number;
}