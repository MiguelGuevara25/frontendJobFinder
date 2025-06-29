import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-usuario',
  imports: [MatTableModule, CommonModule, RouterLink, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuServi: UsuarioService) { }

  ngOnInit(): void {
    this.usuServi.listar().subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data)
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas

    })
    this.usuServi.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });

  }
  eliminar(id: number) {
    this.usuServi.delete(id).subscribe((data) => {
      this.usuServi.listar().subscribe((data) => {
        this.usuServi.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

