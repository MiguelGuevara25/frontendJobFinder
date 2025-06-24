import { Component } from '@angular/core';
import { ListarEntrevistaComponent } from './listar-entrevista/listar-entrevista.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-entrevista',
  imports: [ListarEntrevistaComponent, RouterOutlet],
  templateUrl: './entrevista.component.html',
  styleUrl: './entrevista.component.css',
})
export class EntrevistaComponent {
  constructor(public route: ActivatedRoute) {}
}
