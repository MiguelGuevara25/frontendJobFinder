import { Ofertadetrabajo } from './ofertadetrabajo';

export class Postulacion {
  id: number = 0;
  date: Date = new Date();
  state: string = '';
  acceptedcandidate: boolean = false;
  ofertaTrabajo: Ofertadetrabajo = new Ofertadetrabajo();
}
