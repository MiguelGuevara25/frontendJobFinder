import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';
import { RouterLink } from '@angular/router';
import { Ofertadetrabajo } from '../../../models/ofertadetrabajo';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarofertadetrabajo',
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
  templateUrl: './listarofertadetrabajo.component.html',
  styleUrl: './listarofertadetrabajo.component.css',
})
export class ListarofertadetrabajoComponent {
  hasData = false;

  dataSource: MatTableDataSource<Ofertadetrabajo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private oS: OfertadetrabajoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.oS.delete(id).subscribe(() => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
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
