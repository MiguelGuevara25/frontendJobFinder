import { Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { EstudioComponent } from './components/estudio/estudio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { CursoComponent } from './components/curso/curso.component';
import { InsertareditarHabilidadComponent } from './components/habilidad/insertareditar/insertareditar.component';
import { InsertareditarestudioComponent } from './components/estudio/insertareditarestudio/insertareditarestudio.component';
import { EntrevistaComponent } from './components/entrevista/entrevista.component';
import { InsertarEditarEntrevistaComponent } from './components/entrevista/insertar-editar-entrevista/insertar-editar-entrevista.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InsertarEditarContratoComponent } from './components/contrato/insertar-editar-contrato/insertar-editar-contrato.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { InsertarEditarDetalleComponent } from './components/detalle/insertar-editar-detalle/insertar-editar-detalle.component';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { InsertareditarCertificadoComponent } from './components/certificado/insertareditar/insertareditar.component';
import { InsertarexperienciaComponent } from './components/experiencia/insertarexperiencia/insertarexperiencia.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ListarEmpresaComponent } from './components/empresa/listar-empresa/listar-empresa.component';
import { ForumComponent } from './components/forum/forum.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'certificados',
    component: CertificadoComponent,
    children: [
      {
        path: 'insertareditar',
        component: InsertareditarCertificadoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarCertificadoComponent,
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
  {
    path: 'detalles',
    component: DetalleComponent,
    children: [
      {
        path: 'insertar',
        component: InsertarEditarDetalleComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarDetalleComponent,
      },
    ],
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        component: ListarUsuarioComponent,
      },
      {
        path: 'registrar',
        component: InsertareditarusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarusuarioComponent,
      },
    ],
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
    children: [
      {
        path: '',
        component: ListarEmpresaComponent,
      },
    ],
  },
  {
    path: 'foros',
    component: ForumComponent,
  },
];
