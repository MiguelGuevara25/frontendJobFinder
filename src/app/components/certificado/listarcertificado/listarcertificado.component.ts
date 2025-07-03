import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Certificado } from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

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
  pageSize = 3;
  pageIndex = 0;

  constructor(
    private cS: CertificadoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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
    this.actualizarLista();
  this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.actualizarLista();
    });

  const mensaje = window.history.state?.mensaje;
  if (mensaje && typeof mensaje === 'string') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
    window.history.replaceState({}, '');
  }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filtro;
    this.pageIndex = 0;
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.actualizarLista();
      this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  actualizarLista() {
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = (cert, filtro) => {
        const dataStr =
          `${cert.idCertificado} ${cert.nombreCertificado} ${cert.entidadEmisoraCertificado} ${cert.fechaEmisionCertificado} ${cert.fechaVencimientoCertificado}`.toLowerCase();
        return dataStr.includes(filtro);
      };

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
