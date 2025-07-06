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
  id: any;
  name: any;
  salary: any;
  contractType: any;
  experience: any;
  location: any;
  constructor (public route: ActivatedRoute){}

}
