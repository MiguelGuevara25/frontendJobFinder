import { Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { InsertareditarComponent } from './components/certificado/insertareditar/insertareditar.component';
import { CursoComponent } from './components/curso/curso.component';

export const routes: Routes = [
    {
    path: 'certificados',
    component: CertificadoComponent,
    children: [
    {
      path:'insertareditar',component:InsertareditarComponent
    },
    {
      path:'ediciones/:id',component:InsertareditarComponent
    },
    
    
    ],
   },
   {
    path: 'cursos',
    component: CursoComponent,
    },

  {
    path: 'habilidades',
    component: HabilidadComponent,
  },
  {
    path: 'estudios',
    component: EstudioComponent,
  },
  {
    path: 'experiencias',
    component: ExperienciaComponent,
  },
];
