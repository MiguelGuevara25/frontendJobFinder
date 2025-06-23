import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  imports: [MatTableModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit{

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8'];

  constructor(private usuServi: UsuarioService){}

  ngOnInit(): void {
    this.usuServi.listar().subscribe((us_data) => {
      this.dataSource = new MatTableDataSource(us_data)
    })
  }
}

