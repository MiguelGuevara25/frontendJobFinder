import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vergemini',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './vergemini.component.html',
  styleUrl: './vergemini.component.css'
})
export class VergeminiComponent {
  prompt: string = '';
  respuesta: string = '';
  isLoading = false;

  constructor(private geminiService: GeminiService) {}

  enviarPrompt() {
    if (!this.prompt.trim()) {
      // Evita enviar prompts vacíos
      return;
    }
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
