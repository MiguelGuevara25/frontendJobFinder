import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobFinder';
}
