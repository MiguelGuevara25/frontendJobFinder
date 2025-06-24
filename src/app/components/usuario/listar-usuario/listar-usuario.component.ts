import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-usuario',
  imports: [MatTableModule, CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  constructor(private usuServi: UsuarioService) { }

  ngOnInit(): void {
    this.usuServi.listar().subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data)
    })
    this.usuServi.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.usuServi.delete(id).subscribe((data) => {
      this.usuServi.listar().subscribe((data) => {
        this.usuServi.setList(data);
      });
    });
  }
}

