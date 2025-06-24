import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from "./components/habilidad/habilidad.component";
import { CursoComponent } from './components/curso/curso.component';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobFinder';
}
