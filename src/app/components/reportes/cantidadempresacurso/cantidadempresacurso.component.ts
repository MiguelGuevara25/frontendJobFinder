import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-cantidadempresacurso',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './cantidadempresacurso.component.html',
  styleUrl: './cantidadempresacurso.component.css'
})
export class CantidadempresacursoComponent implements OnInit{
hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  }
  barChartLabels: string[] = [];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];

      constructor(private cus: CursoService) {}
    
    ngOnInit(): void {
    this.cus.getcantidadCursosEmpresa().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map((item) => item.empresa.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.total),
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
