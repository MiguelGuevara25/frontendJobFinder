import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcursoComponent } from './listarcurso/listarcurso.component';

@Component({
  selector: 'app-curso',
  imports: [RouterOutlet, ListarcursoComponent],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  constructor(public route: ActivatedRoute) {}
}
