import { Component, OnInit } from '@angular/core';
import { EstudioService } from '../../../services/estudio.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-institucionfrecuente',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './institucionfrecuente.component.html',
  styleUrl: './institucionfrecuente.component.css',
})
export class InstitucionfrecuenteComponent implements OnInit {
  hasData = false;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(private estudioService: EstudioService) {}

  ngOnInit(): void {
    this.estudioService.getFrecuenciaInstituciones().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map((item) => item.universidad);
        this.barChartData = [
          {
            data: data.map((item) => item.frecuencia),
            label: 'Frecuencia de universidades', // en pie no se ve tanto esto, pero no estorba
            backgroundColor: [
              '#3f51b5',
              '#ff4081',
              '#4caf50',
              '#ff9800',
              '#00bcd4',
              '#9c27b0',
              '#e91e63',
              '#cddc39',
              '#607d8b',
              '#795548',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
