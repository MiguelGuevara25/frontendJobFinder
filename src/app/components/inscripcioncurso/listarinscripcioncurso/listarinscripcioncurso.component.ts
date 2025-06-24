import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { InscripcionCurso } from '../../../models/incripcioncurso';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';

@Component({
  selector: 'app-listarinscripcioncurso',
  imports: [MatInputModule,MatTableModule,CommonModule, MatButtonModule, RouterLink, MatIconModule ],
  templateUrl: './listarinscripcioncurso.component.html',
  styleUrl: './listarinscripcioncurso.component.css'
})
export class ListarinscripcioncursoComponent {
  dataSource: MatTableDataSource<InscripcionCurso> = new MatTableDataSource();
    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  constructor(private iCS: InscripcioncursoService) {
  }
  ngOnInit(): void {
      this.iCS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      this.iCS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  eliminar(id: number) {
    this.iCS.delete(id).subscribe((data) => {
      this.iCS.list().subscribe((data) => {
        this.iCS.setList(data);
      });
    });
  }
}
