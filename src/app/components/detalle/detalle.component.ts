import { Component } from '@angular/core';
import { ListarDetalleComponent } from './listar-detalle/listar-detalle.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detalle',
  imports: [RouterOutlet, ListarDetalleComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent {
  constructor(public route: ActivatedRoute) {}
}
