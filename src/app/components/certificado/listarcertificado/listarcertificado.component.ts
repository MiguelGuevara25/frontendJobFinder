import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Certificado } from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcertificado',
  imports: [
    MatInputModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  standalone: true,
  templateUrl: './listarcertificado.component.html',
  styleUrl: './listarcertificado.component.css',
})
export class ListarcertificadoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Certificado> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hasData = false;
  dataFiltradaPaginada: Certificado[] = [];
  pageSize = 3;
  pageIndex = 0;
  

  constructor(
    private cS: CertificadoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  get paginados() {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.filteredData.slice(start, start + this.pageSize);
  }
  cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.hasData = data.length > 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.cS.getList().subscribe((data) => {
      this.hasData = data.length > 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // <== aquí lo asignas
    });
    this.dataSource.filterPredicate = (data: Certificado, filter: string) => {
      const dataStr =
        `${data.idCertificado} ${data.nombreCertificado} ${data.entidadEmisoraCertificado} ${data.fechaEmisionCertificado} ${data.fechaVencimientoCertificado}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.dataSource.data = data;
        this.snackBar.open('Certificado eliminado con éxito!', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }
  verCertificadosVigentes() {
    this.cS.mostrarCertificadosVigentes().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.pageIndex = 0;
      this.snackBar.open('Mostrando certificados vigentes', 'Cerrar', {
        duration: 3000,
      });
    });
  }
  cargarCertificados() {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.pageIndex = 0;
    });
  }
}
