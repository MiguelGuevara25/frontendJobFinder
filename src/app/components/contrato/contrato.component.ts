import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarContratoComponent } from "./listar-contrato/listar-contrato.component";

@Component({
  selector: 'app-contrato',
  imports: [RouterOutlet, ListarContratoComponent],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css',
})
export class ContratoComponent {
  constructor(public route: ActivatedRoute) {}
}
