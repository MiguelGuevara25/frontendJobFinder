import { Component } from '@angular/core';
import { ListarestudioComponent } from './listarestudio/listarestudio.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-estudio',
  imports: [ListarestudioComponent, RouterOutlet],
  templateUrl: './estudio.component.html',
  styleUrl: './estudio.component.css'
})
export class EstudioComponent {
  constructor(public route: ActivatedRoute){}
}
