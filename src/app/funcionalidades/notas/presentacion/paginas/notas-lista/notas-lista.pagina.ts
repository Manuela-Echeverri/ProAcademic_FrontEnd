import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notas-lista-pagina',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],

  templateUrl: './notas-lista.pagina.html'
})
export class NotasListaPagina {

  cargando = false;

  columnas: string[] = [
    'estudiante',
    'materia',
    'nota',
    'acciones'
  ];

  notas = [
    {
      estudiante: 'Juan Pérez',
      materia: 'Matemáticas',
      nota: 4.5
    },
    {
      estudiante: 'Laura Gómez',
      materia: 'Programación',
      nota: 3.8
    }
  ];

  eliminar(nota: any) {
    this.notas = this.notas.filter(n => n !== nota);
  }

}