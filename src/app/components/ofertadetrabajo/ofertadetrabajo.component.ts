import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarofertadetrabajoComponent } from '../certificado/listarcertificado/listarcertificado.component';

@Component({
  selector: 'app-ofertadetrabajo',
  imports: [RouterOutlet, ListarofertadetrabajoComponent],
  templateUrl: './ofertadetrabajo.html',
  styleUrl: './ofertadetrabajo.css'
})
export class Ofertadetrabajo {
  constructor (public route: ActivatedRoute){}

}
