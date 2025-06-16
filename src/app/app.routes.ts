import { Routes } from '@angular/router';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { InsertareditarComponent } from './components/habilidad/insertareditar/insertareditar.component';

export const routes: Routes = [
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
