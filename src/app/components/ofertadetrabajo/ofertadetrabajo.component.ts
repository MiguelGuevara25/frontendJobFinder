import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarofertadetrabajoComponent } from './listarofertadetrabajo/listarofertadetrabajo.component';

@Component({
  selector: 'app-ofertadetrabajo',
  imports: [RouterOutlet, ListarofertadetrabajoComponent],
  templateUrl: './ofertadetrabajo.component.html',
  styleUrl: './ofertadetrabajo.component.css'
})
export class Ofertadetrabajo {
  constructor (public route: ActivatedRoute){}

}
