import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoNota',
  standalone: true
})
export class EstadoNotaTuberia implements PipeTransform {

  transform(nota: number): string {
    if (nota >= 4.5) return 'Excelente';
    if (nota >= 4.0) return 'Sobresaliente';
    if (nota >= 3.5) return 'Aceptable';
    if (nota >= 3.0) return 'Aprobado';
    return 'Reprobado';
  }
}
