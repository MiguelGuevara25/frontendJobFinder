import { Component, ViewChild } from '@angular/core';
import { ContratoService } from '../../../services/contrato.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contrato } from '../../../models/contrato';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-contrato',
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
  templateUrl: './listar-contrato.component.html',
  styleUrl: './listar-contrato.component.css',
})
export class ListarContratoComponent {
  dataSource: MatTableDataSource<Contrato> = new MatTableDataSource();
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
    'c10',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ContratoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('¡Contrato eliminado con éxito!', 'Cerrar', {
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
