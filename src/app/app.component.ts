import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from "./components/habilidad/habilidad.component";

@Component({
  selector: 'app-root',
  imports: [HabilidadComponent, RouterOutlet, CertificadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobFinder';
}
