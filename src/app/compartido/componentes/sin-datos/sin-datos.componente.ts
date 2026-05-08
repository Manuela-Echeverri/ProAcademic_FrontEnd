import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sin-datos',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 text-gray-400">
      <mat-icon class="text-6xl mb-4">inbox</mat-icon>
      <p class="text-lg">{{ mensaje }}</p>
    </div>
  `
})
export class SinDatosComponente {
  @Input() mensaje: string = 'No hay datos disponibles';
}
