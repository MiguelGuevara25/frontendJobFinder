import { Component } from '@angular/core';
import { ContratoService } from '../../../services/contrato.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contrato } from '../../../models/contrato';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-contrato',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listar-contrato.component.html',
  styleUrl: './listar-contrato.component.css',
})
export class ListarContratoComponent {
  dataSource: MatTableDataSource<Contrato> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private cS: ContratoService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
