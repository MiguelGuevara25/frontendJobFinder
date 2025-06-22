import { Empresa } from './empresa';

export class Contrato {
  id: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  salary: number = 0;
  contractType: string = '';
  // user: Usuario = new Usuario();
  // postulacion: Postulacion = new Postulacion();
  empresa: Empresa = new Empresa();
}
