import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcertificadoComponent } from './listarcertificado/listarcertificado.component';

@Component({
  selector: 'app-certificado',
  imports: [RouterOutlet, ListarcertificadoComponent],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.css'
})
export class CertificadoComponent {
  constructor(public route: ActivatedRoute) {}
}
