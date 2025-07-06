import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listar-experiencia',
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
  templateUrl: './listar-experiencia.component.html',
  styleUrl: './listar-experiencia.component.css',
})
export class ListarExperienciaComponent implements OnInit {
  dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private exS: ExperienciaService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
  this.exS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });

  this.exS.list().subscribe((data) => {
    this.exS.setList(data);
  });
}

  eliminar(id: number) {
    this.exS.delete(id).subscribe((data) => {
      this.exS.list().subscribe((data) => {
        this.exS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.snackBar.open('¡Experiencia eliminada con éxito!', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
