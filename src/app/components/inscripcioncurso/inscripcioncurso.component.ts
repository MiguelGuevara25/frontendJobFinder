import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarinscripcioncursoComponent } from './listarinscripcioncurso/listarinscripcioncurso.component';

@Component({
  selector: 'app-inscripcioncurso',
  imports: [RouterOutlet, ListarinscripcioncursoComponent],
  templateUrl: './inscripcioncurso.component.html',
  styleUrl: './inscripcioncurso.component.css'
})
export class InscripcioncursoComponent {
  constructor(public route: ActivatedRoute) {}

}
