import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosContratoActivoDTO } from '../../../models/usuariosContratoActivoDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contratosactivos',
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
  templateUrl: './contratosactivos.component.html',
  styleUrl: './contratosactivos.component.css'
})
export class ContratosactivosComponent implements OnInit, AfterViewInit{

  dataSource: MatTableDataSource<UsuariosContratoActivoDTO> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6'
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuServi: UsuarioService,
  ) { }


  ngOnInit(): void {
    this.usuServi.getContratosActivos().subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.dataSource.filterPredicate = (data: UsuariosContratoActivoDTO, filter: string) => {
      const dataStr =
        `${data.id_usuario} ${data.nombre} ${data.apellido}`.toLowerCase();
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
