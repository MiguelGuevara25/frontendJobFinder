import { Component, ViewChild } from '@angular/core';
import { Rol } from '../../../models/rol';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarrol',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent {

  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RolService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.dataSource.filterPredicate = (data: Rol, filter: string) => {
      const dataStr = `${data.id} ${data.rol}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }
  eliminar(id: number): void {
  this.rS.delete(id).subscribe({
    next: () => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
        this._snackBar.open('Curso eliminado correctamente', 'Cerrar', {
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
        this._snackBar.open(
          'No se puede eliminar el curso porque tiene inscripciones registradas.',
          'Cerrar',
          { duration: 4000 }
        );
      } else {
        this._snackBar.open(
          'Ocurrió un error al intentar eliminar el curso.',
          'Cerrar',
          { duration: 3000 }
        );
      }
    }
  });
}
 

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
