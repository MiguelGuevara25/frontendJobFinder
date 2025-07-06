import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { PostulacionService } from "../../../services/postulacion.service";
import { Postulacion } from "../../../models/postulacion";


@Component({
  selector: 'app-listarpostulacion',
  standalone: true,
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './listarpostulacion.component.html',
  styleUrl: './listarpostulacion.component.css'
})
export class ListarpostulacionComponent {
  dataSource: MatTableDataSource<Postulacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
  ];

  constructor(private pS: PostulacionService) { }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}

