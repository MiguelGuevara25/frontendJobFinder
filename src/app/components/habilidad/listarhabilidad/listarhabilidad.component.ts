import { Component, OnInit, ViewChild } from '@angular/core';
import { Habilidad } from '../../../models/habilidad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HabilidadService } from '../../../services/habilidad.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HabilidadVacia } from '../../../models/habilidadvacia';

@Component({
  selector: 'app-listarhabilidad',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './listarhabilidad.component.html',
  styleUrl: './listarhabilidad.component.css',
})
export class ListarhabilidadComponent implements OnInit {
  dataSource: MatTableDataSource<Habilidad> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  vistaActual: 'general' | 'filtro' = 'general'; 

  constructor(private hS: HabilidadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarHabilidades();
    this.escucharCambios();
  }

  cargarHabilidades() {
    this.vistaActual = 'general';
    this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  escucharCambios() {
    this.hS.getList().subscribe((data) => {
      if (this.vistaActual === 'general') {
        this.dataSource.data = data;
      }
    });
  }

  eliminar(id: number) {
    this.hS.delete(id).subscribe(() => {
      if (this.vistaActual === 'general') {
        this.cargarHabilidades();
      } else {
        this.mostrarHabilidadesSinUsuarios();
      }

      this.snackBar.open('¡Habilidad eliminada con éxito!', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarHabilidadesSinUsuarios() {
    this.vistaActual = 'filtro';

    this.hS.habilidadesSinUsuarios().subscribe((data: HabilidadVacia[]) => {
      const habilidades: Habilidad[] = data.map((item) => ({
        id_habilidad: item.id_habilidad,
        nombre: item.nombre,
      }));

      this.dataSource = new MatTableDataSource(habilidades);
      this.dataSource.paginator = this.paginator;
    });
  }

  refrescarLista() {
    this.cargarHabilidades();
  }
}
