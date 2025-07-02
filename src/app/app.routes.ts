import { InsertarEditarEmpresa } from './components/empresa/insertar-editar-empresa/insertar-editar-empresa';
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
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { ListarCurriculumComponent } from './components/curriculum/listar-curriculum/listar-curriculum.component';
import { InsertareditarcurriculumComponent } from './components/curriculum/insertareditarcurriculum/insertareditarcurriculum.component';
import { Ofertadetrabajo } from './components/ofertadetrabajo/ofertadetrabajo';
import { InsertarEditarOfertadetrabajo } from './components/ofertadetrabajo/insertar-editar-ofertadetrabajo/insertar-editar-ofertadetrabajo';
import { ListarPostulacion } from './components/postulacion/listar-postulacion/listar-postulacion';
import { InsertarEditarPostulacion } from './components/postulacion/insertar-editar-postulacion/insertar-editar-postulacion';
import { Postulacion } from './components/postulacion/postulacion';


export const routes: Routes = [
  //Ejecucion Inicial
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  //Enrutamiento de home
  {
    path: 'home',
    component: HomeComponent,
  },

  //Enrutamiento de Api Foro
  {
    path: 'foros',
    component: ForumComponent,
  },

  //Enrutamiento de Api Gemini
  {
    path: 'gemini',
    component: VergeminiComponent,
  },

  //Enrutamiento de Usuario
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

  //Enrutamiento de Rol
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

  //Enrutamiento de Curriculum
  {
    path: 'curriculum',
    component: CurriculumComponent,
    children: [
      {
        path: '',
        component: ListarCurriculumComponent,
      },
      {
        path: 'registrar',
        component: InsertareditarcurriculumComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarcurriculumComponent,
      },
    ],
  },

  //Enrutamiento de Estudio
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

  //Enrutamiento de Experiencia
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

  //Enrutamiento de Habilidad
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

  //Enrutamiento de Certificado
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

  //Enrutamiento de Curso
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
  
  //Enrutamiento de Inscripcion Curso
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

  //Enrutamiento de Empresa
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
        component: InsertarEditarEmpresa,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarEmpresa,
      },
    ],
  },

  //Enrutamiento de Oferta de Trabajo
  {
    path: 'ofertadetrabajo',
    component: CurriculumComponent,
    children: [
      {
        path: '',
        component: Ofertadetrabajo,
      },
      {
        path: 'registrar',
        component: InsertarEditarOfertadetrabajo,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarOfertadetrabajo,
      },
    ],
  },

  //Enrutamiento de Postulacion
  {
    path: 'Postulacion',
    component: Postulacion,
    children: [
      {
        path: '',
        component: ListarPostulacion,
      },
      {
        path: 'registrar',
        component: InsertarEditarPostulacion,
      },
      {
        path: 'ediciones/:id',
        component: InsertarEditarPostulacion,
      },
    ],
  },

  //Enrutamiento de Entrevista
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

  //Enrutamiento de Contrato
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

  //Enrutamiento de Detalle
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
];
