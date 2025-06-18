import { Component, OnInit } from '@angular/core';
import { Habilidad } from '../../../models/habilidad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HabilidadService } from '../../../services/habilidad.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarhabilidad',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './listarhabilidad.component.html',
  styleUrl: './listarhabilidad.component.css',
})
export class ListarhabilidadComponent implements OnInit {
  dataSource: MatTableDataSource<Habilidad> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private hS: HabilidadService) {}
  ngOnInit(): void {
    this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.hS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.hS.delete(id).subscribe((data) => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
      });
    });
  }
}
