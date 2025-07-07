import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Entrevista } from '../../../models/entrevista';
import { EntrevistaService } from '../../../services/entrevista.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CantidadEntrevistasDTO } from '../../../models/CantidadEntrevistasDTO';

@Component({
  selector: 'app-listar-entrevista',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './listar-entrevista.component.html',
  styleUrl: './listar-entrevista.component.css',
})
export class ListarEntrevistaComponent implements OnInit {
  quantityInterview: CantidadEntrevistasDTO[] = [];
  dataSource: MatTableDataSource<Entrevista> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isFilterActive = false;

  constructor(private eS: EntrevistaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.eS.cantidadEntrevistas().subscribe((data) => {
      this.quantityInterview = data;
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.snackBar.open('Entrevista eliminada con éxito!', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }

  filtrarUltimos30Dias(): void {
    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30);

    const filteredData = this.dataSource.data.filter((interview) => {
      const interviewDate = new Date(interview.date);
      return interviewDate >= last30Days && interviewDate <= today;
    });

    this.dataSource.data = filteredData;
    this.isFilterActive = true;

    if (filteredData.length === 0) {
      this.snackBar.open(
        'No hay entrevistas en los últimos 30 días',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    }
  }

  limpiarFiltro(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.isFilterActive = false;
    });
  }
}
