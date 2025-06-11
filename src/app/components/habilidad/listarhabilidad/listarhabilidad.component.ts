import { Component, OnInit } from '@angular/core';
import { Habilidad } from '../../../models/habilidad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HabilidadService } from '../../../services/habilidad.service';

@Component({
  selector: 'app-listarhabilidad',
  imports: [MatTableModule],
  templateUrl: './listarhabilidad.component.html',
  styleUrl: './listarhabilidad.component.css'
})
export class ListarhabilidadComponent implements OnInit{
  dataSource: MatTableDataSource<Habilidad> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2']

  constructor(private hS:HabilidadService){}
  ngOnInit(): void {
    this.hS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }
}
