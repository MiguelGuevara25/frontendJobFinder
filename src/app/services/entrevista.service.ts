import { environment } from '../../environments/environment';
import { Entrevista } from '../models/entrevista';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CantidadEntrevistasDTO } from '../models/CantidadEntrevistasDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EntrevistaService {
  private url = `${base_url}/entrevistas`;
  private listaCambio = new Subject<Entrevista[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Entrevista[]>(this.url);
  }

  insert(e: Entrevista) {
    return this.http.post(this.url, e);
  }

  listId(id: number) {
    return this.http.get<Entrevista>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Entrevista[]) {
    this.listaCambio.next(listaNueva);
  }

  update(e: Entrevista) {
    return this.http.put(this.url, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  cantidadEntrevistas() {
    return this.http.get<CantidadEntrevistasDTO[]>(`${this.url}/cantidades`);
  }
}
