import { Certificado } from './certificado';
import { Curriculum } from './curriculum';
import { Estudio } from './estudio';
import { Experiencia } from './experiencia';
import { Habilidad } from './habilidad';

export class Detalle {
  id: number = 0;
  experiencias: Experiencia = new Experiencia();
  estudios: Estudio = new Estudio();
  habilidades: Habilidad = new Habilidad();
  curriculums: Curriculum = new Curriculum();
  certificados: Certificado = new Certificado();
}
