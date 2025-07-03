import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  imports: [RouterOutlet],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  constructor(public route: ActivatedRoute) {}
}
