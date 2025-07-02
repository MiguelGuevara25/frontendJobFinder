import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { environment } from '../../environments/environment';
import { Ofertadetrabajo } from '../models/ofertadetrabajo';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OfertadetrabajoService {
private url = `${base_url}/ofertadetrabajo`;
private listaCambio = new Subject<Ofertadetrabajo[]>();

  constructor(private http: HttpClient) {}


    list() {
      return this.http.get<Ofertadetrabajo[]>(this.url);
    }

    insert(d: Ofertadetrabajo) {
      return this.http.post(this.url, d);
    }

    listId(id: number) {
      return this.http.get<Ofertadetrabajo>(`${this.url}/${id}`);
    }

    getList() {
      return this.listaCambio.asObservable();
    }

    setList(listaNueva: Ofertadetrabajo[]) {
      this.listaCambio.next(listaNueva);
    }

    update(d: Ofertadetrabajo) {
      return this.http.put(this.url, d);
    }

    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
