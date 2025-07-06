import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CursoService } from '../../../services/curso.service';


@Component({
  selector: 'app-cantidadplataformacurso',
  imports: [BaseChartDirective, CommonModule, MatIconModule, ],
  templateUrl: './cantidadplataformacurso.component.html',
  styleUrl: './cantidadplataformacurso.component.css'
})
export class CantidadplataformacursoComponent implements OnInit{
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
    constructor(private cuS: CursoService) {}

    ngOnInit(): void {
    this.cuS.getcantidadCursosPlataforma().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map((item) => item.plataformaCurso.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.totalCursos),
            label: 'Cantidad de cursos',
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
