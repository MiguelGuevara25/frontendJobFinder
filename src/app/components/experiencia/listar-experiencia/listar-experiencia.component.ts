import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-experiencia',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './listar-experiencia.component.html',
  styleUrl: './listar-experiencia.component.css',
})
export class ListarExperienciaComponent implements OnInit {
  dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private exS: ExperienciaService) {}
  ngOnInit(): void {
    this.exS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.exS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.exS.delete(id).subscribe((data) => {
      this.exS.list().subscribe((data) => {
        this.exS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
