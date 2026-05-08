import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMayusculas]',
  standalone: true
})
export class MayusculasDirectiva {

  constructor(private elemento: ElementRef) {}

  @HostListener('input', ['$event'])
  alEscribir(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.elemento.nativeElement.value = input.value;
  }
}