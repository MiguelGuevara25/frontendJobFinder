import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';
import { RouterLink } from '@angular/router';
import { Ofertadetrabajo } from '../../../models/ofertadetrabajo';

@Component({
  selector: 'app-listarofertadetrabajo',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    // RouterLink,
    MatIconModule,
  ],
  templateUrl: './listarofertadetrabajo.component.html',
  styleUrl: './listarofertadetrabajo.component.css'
})

export class ListarofertadetrabajoComponent {
  dataSource: MatTableDataSource<Ofertadetrabajo> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6', ];

  constructor(private oS: OfertadetrabajoService) {}
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

    eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }
}

