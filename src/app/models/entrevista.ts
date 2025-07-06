import { Postulacion } from './postulacion';
import { Usuario } from './usuario';

export class Entrevista {
  id: number = 0;
  date: Date = new Date();
  hour: string = '';
  modality: string = '';
  result: string = '';
  user: Usuario = new Usuario();
  postulacion: Postulacion = new Postulacion();
}
