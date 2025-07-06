import { Empresa } from './empresa';

export class Ofertadetrabajo {
  id: number = 0;
  name: string = '';
  description: string = '';
  salary: number = 0;
  typeofcontract: string = '';
  experience: string = '';
  location: string = '';
  empresa: Empresa = new Empresa();
}
