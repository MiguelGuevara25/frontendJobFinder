import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpostulacionComponent } from './listarpostulacion/listarpostulacion.component';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-postulacion',
  imports: [RouterOutlet, ListarpostulacionComponent],
  templateUrl: './postulacion.html',
  styleUrl: './postulacion.css'
})
export class Postulacion {
id: any;
  date: any;
  salary: any;
  contractType: any;
constructor (public route: ActivatedRoute){}
}
