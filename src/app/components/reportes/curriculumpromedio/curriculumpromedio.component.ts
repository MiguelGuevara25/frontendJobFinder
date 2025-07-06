import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurriculumService } from '../../../services/curriculum.service';

@Component({
  selector: 'app-curriculumpromedio',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './curriculumpromedio.component.html',
  styleUrl: './curriculumpromedio.component.css'
})
export class CurriculumpromedioComponent implements OnInit {

  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true
  }

  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private cS: CurriculumService) { }

  ngOnInit(): void {
    this.cS.getPromedio().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map(item => `${item.nombre} ${item.apellido} - ${item.porcentaje_perfil}`);
        this.barChartData = [
          {
            data: data.map(item => item.porcentaje_perfil),
            label: 'Puntaje Absoluto del Currículum',
            backgroundColor: data.map(item => this.getColorForPercentage(item.porcentaje_perfil)),
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ]
      } else {
        this.hasData = false;
      }
    })
  }
  getColorForPercentage(percentage: number): string {
    if (percentage <= 20) return '#FF6347'; // Rojo (Muy bajo)
    if (percentage <= 40) return '#FF8C00'; // Naranja (Bajo)
    if (percentage <= 60) return '#FFD700'; // Amarillo (Medio)
    if (percentage <= 80) return '#32CD32'; // Verde Claro (Alto)
    return '#006400'; // Verde Oscuro (Muy Alto)
  }
}
