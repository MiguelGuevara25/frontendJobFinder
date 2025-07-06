import { Empresa } from './empresa';
import { Postulacion } from './postulacion';
import { Usuario } from './usuario';

export class Contrato {
  id: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  salary: number = 0;
  contractType: string = '';
  usuarios: Usuario = new Usuario();
  postulacion: Postulacion = new Postulacion();
  empresa: Empresa = new Empresa();
}
