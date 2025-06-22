import { Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { InsertareditarComponent } from './components/certificado/insertareditar/insertareditar.component';
import { CursoComponent } from './components/curso/curso.component';
import { InsertareditarHabilidadComponent } from './components/habilidad/insertareditar/insertareditar.component';
import { InsertareditarestudioComponent } from './components/estudio/insertareditarestudio/insertareditarestudio.component';
import { InsertarexperienciaComponent } from './components/experiencia/insertarexperiencia/insertarexperiencia.component';
import { EntrevistaComponent } from './components/entrevista/entrevista.component';
import { InsertarEditarEntrevistaComponent } from './components/entrevista/insertar-editar-entrevista/insertar-editar-entrevista.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InsertarEditarContratoComponent } from './components/contrato/insertar-editar-contrato/insertar-editar-contrato.component';

export const routes: Routes = [
  {
    path: 'certificados',
    component: CertificadoComponent,
    children: [
      {
        path: 'insertareditar',
        component: InsertareditarComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarComponent,
      },
    ],
  },
  {
    path: 'cursos',
    component: CursoComponent,
    children: [
      {
        path: 'insertareditar',
        component: InsertareditarComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarComponent,
      },
    ],
  },
  {
    path: 'habilidades',
    component: HabilidadComponent,
    children: [
      {
        path: 'insertar',
        component: InsertareditarHabilidadComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarHabilidadComponent,
      },
    ],
  },
  {
    path: 'estudios',
    component: EstudioComponent,
    children: [
      {
        path: 'insertar',
        component: InsertareditarestudioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarestudioComponent,
      },
    ],
  },
  {
    path: 'experiencias',
    component: ExperienciaComponent,
    children: [
      {
        path: 'insertar',
        component: InsertarexperienciaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarexperienciaComponent,
      },
    ],
  },
  {
    path: 'entrevista',
    component: EntrevistaComponent,
    children: [
      {
        path: 'insertar',
        component: InsertarEditarEntrevistaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarEntrevistaComponent,
      },
    ],
  },
  {
    path: 'contratos',
    component: ContratoComponent,
    children: [
      {
        path: 'insertar',
        component: InsertarEditarContratoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarContratoComponent,
      },
    ],
  },
];
