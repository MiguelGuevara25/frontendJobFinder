import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PostulacionService } from '../../../services/postulacion.service';
import { Postulacion } from '../../../models/postulacion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarpostulacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listarpostulacion.component.html',
  styleUrl: './listarpostulacion.component.css',
})
export class ListarpostulacionComponent {
  dataSource: MatTableDataSource<Postulacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PostulacionService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.snackBar.open('¡Estudio eliminado con éxito!', 'Cerrar', {
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
