import { Component, OnInit, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource, MatTableModule,  } from '@angular/material/table';
import { Certificado } from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule,  } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';




@Component({
  selector: 'app-listarcertificado',
  imports: [MatInputModule,MatTableModule,CommonModule, MatButtonModule, RouterLink, MatIconModule, MatCardModule ],
  standalone: true,
  templateUrl: './listarcertificado.component.html',
  styleUrl: './listarcertificado.component.css'
})
export class ListarcertificadoComponent implements OnInit{
  dataSource: MatTableDataSource<Certificado> = new MatTableDataSource();
  certificados: Certificado[] = [];
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  constructor(private cS: CertificadoService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.certificados = data;
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
 

}
