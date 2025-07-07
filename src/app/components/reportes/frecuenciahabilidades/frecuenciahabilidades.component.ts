import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { HabilidadService } from '../../../services/habilidad.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frecuenciahabilidades',
  imports: [BaseChartDirective,MatIconModule,CommonModule],
  templateUrl: './frecuenciahabilidades.component.html',
  styleUrl: './frecuenciahabilidades.component.css'
})
export class FrecuenciahabilidadesComponent implements OnInit{
hasData = false;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;

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

  constructor(private hS: HabilidadService) {}

  ngOnInit(): void {
    this.hS.getFrecuenciaHabilidad().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map(item => item.habilidad);
        this.barChartData = [{
          data: data.map(item => item.cantidad),
          label: 'Cantidad de usuarios por habilidad',
          backgroundColor: '#5468ad',
          borderColor: '#283253',
          borderWidth: 1
        }];
      } else {
        this.hasData = false;
      }
    });
  }
}
