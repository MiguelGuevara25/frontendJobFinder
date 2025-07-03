import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarEmpresaComponent } from './listar-empresa/listar-empresa.component';

@Component({
  selector: 'app-empresa',
  imports: [RouterOutlet, ListarEmpresaComponent],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css',
})
export class EmpresaComponent {
constructor(public route: ActivatedRoute) {}
}
