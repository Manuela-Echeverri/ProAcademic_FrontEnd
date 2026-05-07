import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloNumeros]',
  standalone: true
})
export class SoloNumerosDirectiva {

  @HostListener('keypress', ['$event'])
  alPresionarTecla(evento: KeyboardEvent): boolean {
    const patron = /[0-9]/;
    return patron.test(evento.key);
  }
}
