import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-promedioinscripcioncursos',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './promedioinscripcioncursos.component.html',
  styleUrl: './promedioinscripcioncursos.component.css'
})
export class PromedioinscripcioncursosComponent implements OnInit{
hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
    y: {
      ticks: {
        precision: 0
      }
    }
  }
  };

  barChartLabels: string[] = [];
    barChartType: ChartType = 'line';
    barChartLegend = false;
    barChartData: ChartDataset[] = [];
    constructor(private iCS: InscripcioncursoService) {}

    ngOnInit(): void {
    this.iCS.getPromedioInscripcionCursos().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map((item) => item.tituloCurso.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.promedioProgreso),
            label: 'Promedio progreso de curso',
            backgroundColor: [
              '#003f5c',
              '#2f4b7c',
              '#665191',
              '#a05195',
              '#d45087',
              '#f95d6a',
              '#ff7c43',
              '#ffa600',
            ],
            borderColor: '#1976d2',
            borderWidth: 1,
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }

}
