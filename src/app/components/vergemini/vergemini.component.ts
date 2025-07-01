import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vergemini',
  imports: [CommonModule, FormsModule],
  templateUrl: './vergemini.component.html',
  styleUrl: './vergemini.component.css'
})
export class VergeminiComponent {
  prompt: string = '';
  respuesta: string = '';
  isLoading = false;

  constructor(private geminiService: GeminiService) {}

  enviarPrompt() {
    this.isLoading = true;
    this.geminiService.getResponse(this.prompt).subscribe({
      next: (res) => {
        this.respuesta = res.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.respuesta = 'Hubo un error al consultar la IA.';
        this.isLoading = false;
      },
    });
  }

}
