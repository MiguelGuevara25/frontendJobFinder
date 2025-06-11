import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Estudio } from '../../../models/estudio';
import { EstudioService } from '../../../services/estudio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarestudio',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarestudio.component.html',
  styleUrl: './listarestudio.component.css',
})
export class ListarestudioComponent implements OnInit {
  dataSource: MatTableDataSource<Estudio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private eS: EstudioService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
