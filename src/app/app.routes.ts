import { Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';

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
    }
    
  ],
  },

  {
    path: 'habilidades',
    component: HabilidadComponent,
    children: [
      {
        path: 'insertar',
        component: InsertareditarComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarComponent,
      },
    ],
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
