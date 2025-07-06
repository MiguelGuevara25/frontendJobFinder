import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/curso';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CursoService } from '../../../services/curso.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcurso',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './listarcurso.component.html',
  styleUrl: './listarcurso.component.css',
})
export class ListarcursoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataFiltradaPaginada: Curso[] = [];
  hasData = false;

  constructor(private cS: CursoService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.hasData = data.length > 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.hasData = data.length > 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number): void {
  this.cS.delete(id).subscribe({
    next: () => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
        this.snackBar.open('Curso eliminado correctamente', 'Cerrar', {
          duration: 3000
        });
      });
    },
    error: (error) => {
      console.error(error); // Para ver el detalle en consola
      if (
        error.status === 500 &&
        error.error?.message?.includes('violates foreign key constraint')
      ) {
        this.snackBar.open(
          'No se puede eliminar el curso porque tiene inscripciones registradas.',
          'Cerrar',
          { duration: 4000 }
        );
      } else {
        this.snackBar.open(
          'Ocurrió un error al intentar eliminar el curso.',
          'Cerrar',
          { duration: 3000 }
        );
      }
    }
  });
}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
