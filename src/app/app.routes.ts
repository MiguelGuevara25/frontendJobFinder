import { Routes } from '@angular/router';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';

export const routes: Routes = [
  {
    path: 'habilidades',
    component: HabilidadComponent,
  },
  {
    path: 'estudios',
    component: EstudioComponent,
  },
];
