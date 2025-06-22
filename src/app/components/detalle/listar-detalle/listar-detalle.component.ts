import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DetallesService } from '../../../services/detalles.service';
import { Detalle } from '../../../models/detalles';

@Component({
  selector: 'app-listar-detalle',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listar-detalle.component.html',
  styleUrl: './listar-detalle.component.css',
})
export class ListarDetalleComponent {
  dataSource: MatTableDataSource<Detalle> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private dS: DetallesService) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
