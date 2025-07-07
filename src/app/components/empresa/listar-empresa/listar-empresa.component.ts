import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-empresa',
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
  templateUrl: './listar-empresa.component.html',
  styleUrl: './listar-empresa.component.css',
})
export class ListarEmpresaComponent {
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();
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
    'c11',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listEmpresa: Empresa[] = [];
  selectedSector: string = '';

  constructor(private eS: EmpresaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.listEmpresa = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('Empresa eliminada con éxito!', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }

  filtrarSector(event: Event) {
    const sector = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (sector) {
      this.dataSource.data = this.listEmpresa.filter(
        (empresa) => empresa.sector.toLowerCase().includes(sector) // Filtra por el sector
      );
    } else {
      this.dataSource.data = this.listEmpresa; // Si no hay filtro, muestra todos los datos
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Si hay paginador, vuelve a la primera página
    }
  }
}
