import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Estudio } from '../../../models/estudio';
import { EstudioService } from '../../../services/estudio.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarestudio',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './listarestudio.component.html',
  styleUrl: './listarestudio.component.css',
})
export class ListarestudioComponent implements OnInit {
  dataSource: MatTableDataSource<Estudio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private eS: EstudioService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.snackBar.open('¡Estudio eliminado con éxito!', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }
}
