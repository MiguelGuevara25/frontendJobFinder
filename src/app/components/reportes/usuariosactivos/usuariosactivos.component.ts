import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { usuariosActivosDTO } from '../../../models/usuariosActivosDTO';

@Component({
  selector: 'app-usuariosactivos',
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './usuariosactivos.component.html',
  styleUrl: './usuariosactivos.component.css'
})
export class UsuariosactivosComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<usuariosActivosDTO> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5'
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuServi: UsuarioService,
  ) { }


  ngOnInit(): void {
    this.usuServi.listarActivos(true).subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.dataSource.filterPredicate = (data: usuariosActivosDTO, filter: string) => {
      const dataStr =
        `${data.idUsuario} ${data.apellidoUsuario} ${data.nombreUsuario}`.toLowerCase();
      return dataStr.includes(filter);
    };
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
