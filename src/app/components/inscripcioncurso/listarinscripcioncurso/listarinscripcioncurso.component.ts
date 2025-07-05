import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';
import { InscripcionCurso } from '../../../models/inscripcionCurso';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarinscripcioncurso',
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarinscripcioncurso.component.html',
  styleUrl: './listarinscripcioncurso.component.css',
})
export class ListarinscripcioncursoComponent implements OnInit, AfterViewInit {
  hasData = false;
  dataSource: MatTableDataSource<InscripcionCurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataFiltradaPaginada: InscripcionCurso[] = [];

  constructor(
    private iCS: InscripcioncursoService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.iCS.list().subscribe((data) => {
      this.hasData = data.length > 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iCS.getList().subscribe((data) => {
      this.hasData = data.length > 0;

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number) {
    this.iCS.delete(id).subscribe((data) => {
      this.iCS.list().subscribe((data) => {
        this.iCS.setList(data);
        this.dataSource.data = data;
        this.snackBar.open(
          '¡Inscripcion Curso eliminado con éxito!',
          'Cerrar',
          {
            duration: 3000,
          }
        );
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
