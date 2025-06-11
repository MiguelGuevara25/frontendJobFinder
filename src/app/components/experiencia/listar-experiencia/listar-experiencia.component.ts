import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';

@Component({
  selector: 'app-listar-experiencia',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listar-experiencia.component.html',
  styleUrl: './listar-experiencia.component.css',
})
export class ListarExperienciaComponent implements OnInit {
  dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private exS: ExperienciaService) {}
  ngOnInit(): void {
    this.exS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
