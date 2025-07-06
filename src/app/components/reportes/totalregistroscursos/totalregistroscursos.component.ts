import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';

@Component({
  selector: 'app-totalregistroscursos',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './totalregistroscursos.component.html',
  styleUrl: './totalregistroscursos.component.css'
})
export class TotalregistroscursosComponent implements OnInit{
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
    barChartType: ChartType = 'bar';
    barChartLegend = false;
    barChartData: ChartDataset[] = [];
    constructor(private iCS: InscripcioncursoService) {}

    ngOnInit(): void {
    this.iCS.getTotalRegistrosCurso().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map((item) => item.tituloCurso.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.totalRegistros),
            label: 'Cantidad de inscripcion cursos',
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
