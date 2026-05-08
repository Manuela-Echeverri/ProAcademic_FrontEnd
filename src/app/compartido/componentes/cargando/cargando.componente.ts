import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="flex items-center justify-center w-full h-full p-8">
      <mat-spinner [diameter]="diametro"></mat-spinner>
    </div>
  `
})
export class CargandoComponente {
  @Input() diametro: number = 48;
}

