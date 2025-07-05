import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Location } from '@angular/common';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-verperfil',
  imports: [MatTableModule,
    CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './verperfil.component.html',
  styleUrl: './verperfil.component.css'
})
export class VerperfilComponent implements OnInit {

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
  usuario: Usuario | null = null;
  id: number = 0;


  constructor(
    private usuServi: UsuarioService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    this.usuServi.listarId(this.id).subscribe((data) => {
      this.usuario = data;
    });
  }

  volver() {
    this.location.back(); // ← Esto te lleva a la página anterior
  }
}
