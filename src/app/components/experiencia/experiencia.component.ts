import { Component } from '@angular/core';
import { ListarExperienciaComponent } from './listar-experiencia/listar-experiencia.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-experiencia',
  imports: [ListarExperienciaComponent,RouterOutlet],
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.css'
})
export class ExperienciaComponent {
  constructor(public route: ActivatedRoute){}
}
