import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ExperienciaService } from '../../../services/experiencia.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-duracionpromediopuesto',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './duracionpromediopuesto.component.html',
  styleUrl: './duracionpromediopuesto.component.css',
})
export class DuracionpromediopuestoComponent implements OnInit {
  hasData = false;

  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {},
      y: {
        title: {
          display: true,
          text: 'Meses (promedio)',
        },
      },
    },
  };

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.experienciaService.getDuracionPromedioPorPuesto().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.puesto);
        this.barChartData = [
          {
            data: data.map((item) => item.duracion_promedio),
            label: 'Duración Promedio (meses)',
            backgroundColor: '#42A5F5',
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
