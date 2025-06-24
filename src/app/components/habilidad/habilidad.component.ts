import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhabilidadComponent } from './listarhabilidad/listarhabilidad.component';

@Component({
  selector: 'app-habilidad',
  imports: [ListarhabilidadComponent, RouterOutlet],
  templateUrl: './habilidad.component.html',
  styleUrl: './habilidad.component.css',
})
export class HabilidadComponent {
  constructor(public route: ActivatedRoute) {}
}
