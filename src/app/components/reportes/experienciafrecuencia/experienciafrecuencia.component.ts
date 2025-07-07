import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ExperienciaService } from '../../../services/experiencia.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-experienciafrecuencia',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './experienciafrecuencia.component.html',
  styleUrl: './experienciafrecuencia.component.css',
})
export class ExperienciafrecuenciaComponent implements OnInit {
  hasData = false;

  barChartType: ChartType = 'bar';
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartLegend = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.experienciaService
      .getPromedioExperienciaLaboral()
      .subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map(
            (item) => `Usuario ${item.id_usuario}`
          );
          this.barChartData = [
            {
              data: data.map((item) => item.cantidad),
              label: 'Cantidad de experiencias por usuario',
              backgroundColor: '#4caf50',
              borderColor: '#2e7d32',
              borderWidth: 1,
            },
          ];
        } else {
          this.hasData = false;
        }
      });
  }
}
