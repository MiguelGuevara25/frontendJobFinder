import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listar-curriculum',
  standalone:true,
  imports: [MatTableModule,
    CommonModule, RouterLink, MatIconModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './listar-curriculum.component.html',
  styleUrl: './listar-curriculum.component.css'
})
export class ListarCurriculumComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Curriculum> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataFiltradaPaginada: Curriculum[] = [];
  pageSize = 3;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private curricuServi: CurriculumService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.curricuServi.listar().subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data)
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    })
    this.curricuServi.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.dataSource.filterPredicate = (data: Curriculum, filter: string) => {
      const dataStr = `${data.idCurriculum} ${data.descripcionCurriculum} ${data.usuario.nombreUsuario} ${data.usuario.apellidoUsuario} ${data.usuario.edadUsuario}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  eliminar(id: number) {
    this.curricuServi.delete(id).subscribe(() => {
      this.curricuServi.listar().subscribe((data) => {
        this.curricuServi.setList(data);
        this.dataSource.data = data;
        this._snackBar.open("¡Curriculum eliminado con éxito!", "Cerrar", {
          duration: 3000,
        });
      });
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

  get paginados() {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.filteredData.slice(start, start + this.pageSize);
  }
  cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
