import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { inscripcionCurso } from '../../../models/inscripcionCurso';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';

@Component({
  selector: 'app-listarinscripcioncurso',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listarinscripcioncurso.component.html',
  styleUrl: './listarinscripcioncurso.component.css',
})
export class ListarinscripcioncursoComponent {
  dataSource: MatTableDataSource<inscripcionCurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private iCS: InscripcioncursoService) {}
  ngOnInit(): void {
    this.iCS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.iCS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.iCS.delete(id).subscribe(() => {
      this.iCS.list().subscribe((data) => {
        this.iCS.setList(data);
      });
    });
  }
}
