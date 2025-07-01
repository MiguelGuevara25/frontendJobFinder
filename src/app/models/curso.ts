import { Empresa } from './empresa';

export class Curso {
  idCurso: number = 0;
  tituloCurso: string = '';
  descripcionCurso: string = '';
  plataformaCurso: string = '';
  linkCurso: string = '';
  empresa: Empresa = new Empresa();
}
