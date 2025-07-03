import { InsertarEditarEmpresa } from './components/empresa/insertar-editar-empresa/insertar-editar-empresa';
import { Component } from '@angular/core';
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
import { InsertareditarcursoComponent } from './components/curso/insertareditarcurso/insertareditarcurso.component';
import { ForumComponent } from './components/forum/forum.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarrolComponent } from './components/rol/listarrol/listarrol.component';
import { InsertareditarolComponent } from './components/rol/insertareditarol/insertareditarol.component';
import { VergeminiComponent } from './components/vergemini/vergemini.component';
import { InscripcioncursoComponent } from './components/inscripcioncurso/inscripcioncurso.component';
import { ListarinscripcioncursoComponent } from './components/inscripcioncurso/listarinscripcioncurso/listarinscripcioncurso.component';
import { InsertareditarinscripcioncursoComponent } from './components/inscripcioncurso/insertareditarinscripcioncurso/insertareditarinscripcioncurso.component';

import { HomeComponent } from './components/home/home.component';
import { Ofertadetrabajo } from './components/ofertadetrabajo/ofertadetrabajo';
import { ListarOfertadetrabajo } from './components/ofertadetrabajo/listar-ofertadetrabajo/listar-ofertadetrabajo';
import { Postulacion } from './components/postulacion/postulacion';
import { InsertareditarempresaComponent } from './components/empresa/insertareditarempresa/insertareditarempresa.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
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
    children: [
      {
        path: 'insertareditarcurso',
        component: InsertareditarcursoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarcursoComponent,
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
      {
        path: 'registrar',
        component: InsertareditarempresaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarempresaComponent,
      },
    ],
  },
  {
    path: 'ofertadetrabajo',
    component: Ofertadetrabajo,
    children: [
      {
        path: '',
        component: ListarOfertadetrabajoComponent,
      },
      {
        path: 'registrar',
        component: InsertarEditarOfertadetrabajoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarOfertadetrabajoComponent,
      },
    ],
  },
    {
    path: 'Postulacion',
    component: Postulacion,
    children: [
      {
        path: '',
        component: ListarPostulacionComponent,
      },
      {
        path: 'registrar',
        component: InsertarEditarPostulaciónComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarPostulaciónComponent,
      },
    ],
  },
  {
    path: 'foros',
    component: ForumComponent,
  },
  {
    path: 'rol',
    component: RolComponent,
    children: [
      {
        path: '',
        component: ListarrolComponent,
      },
      {
        path: 'registrar',
        component: InsertareditarolComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarolComponent,
      },
    ],
  },
  {
    path: 'gemini',
    component: VergeminiComponent,
  },
  {
    path: 'inscripcioncursos',
    component: InscripcioncursoComponent,
    children: [
      {
        path: '',
        component: ListarinscripcioncursoComponent,
      },
      {
        path: 'registrar',
        component: InsertareditarinscripcioncursoComponent,
      },
    ],
  },
];
