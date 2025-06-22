import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Entrevista } from '../../../models/entrevista';
import { EntrevistaService } from '../../../services/entrevista.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-entrevista',
  imports: [
    MatInputModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './listar-entrevista.component.html',
  styleUrl: './listar-entrevista.component.css',
})
export class ListarEntrevistaComponent {
  dataSource: MatTableDataSource<Entrevista> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  constructor(private eS: EntrevistaService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
