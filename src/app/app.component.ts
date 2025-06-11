import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HabilidadComponent } from "./components/habilidad/habilidad.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HabilidadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobFinder';
}
