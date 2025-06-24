/*import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/curso';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listarcurso',
  imports: [CommonModule,  MatTableModule, MatInputModule],
  templateUrl: './listarcurso.component.html',
  styleUrl: './listarcurso.component.css'
})
export class ListarcursoComponent implements OnInit{
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  constructor(private cS: CursoService) {}
  ngOnInit(): void {
      this.cS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      this.cS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
}*/
