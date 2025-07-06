import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CantidadcertificadosComponent } from './cantidadcertificados/cantidadcertificados.component';
import { CantidadempresacursoComponent } from './cantidadempresacurso/cantidadempresacurso.component';
import { CantidadplataformacursoComponent } from './cantidadplataformacurso/cantidadplataformacurso.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-reportes',
  imports: [CantidadcertificadosComponent,CantidadempresacursoComponent,CantidadplataformacursoComponent,MatCardModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
