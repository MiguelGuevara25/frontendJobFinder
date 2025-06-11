import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource, MatTableModule,  } from '@angular/material/table';
import { Certificado } from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';

@Component({
  selector: 'app-listarcertificado',
  imports: [MatInputModule,MatTableModule],
  
  templateUrl: './listarcertificado.component.html',
  styleUrl: './listarcertificado.component.css'
})
export class ListarcertificadoComponent implements OnInit{
  dataSource: MatTableDataSource<Certificado> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  constructor(private cS: CertificadoService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
