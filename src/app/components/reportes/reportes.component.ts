import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CantidadcertificadosComponent } from './cantidadcertificados/cantidadcertificados.component';
import { CantidadempresacursoComponent } from './cantidadempresacurso/cantidadempresacurso.component';
import { CantidadplataformacursoComponent } from './cantidadplataformacurso/cantidadplataformacurso.component';
import { MatCardModule } from '@angular/material/card';
import { CurriculumpromedioComponent } from './curriculumpromedio/curriculumpromedio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FrecuenciahabilidadesComponent } from './frecuenciahabilidades/frecuenciahabilidades.component';
import { InstitucionfrecuenteComponent } from "./institucionfrecuente/institucionfrecuente.component";
import { ExperienciafrecuenciaComponent } from "./experienciafrecuencia/experienciafrecuencia.component";
import { DuracionpromediopuestoComponent } from "./duracionpromediopuesto/duracionpromediopuesto.component";

@Component({
  selector: 'app-reportes',
  imports: [
    MatTabsModule,
    MatExpansionModule,
    CantidadcertificadosComponent,
    CantidadempresacursoComponent,
    CantidadplataformacursoComponent,
    MatCardModule,
    CurriculumpromedioComponent,
    FrecuenciahabilidadesComponent,
    InstitucionfrecuenteComponent,
    ExperienciafrecuenciaComponent,
    DuracionpromediopuestoComponent
],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
