import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../models/contrato';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private url = `${base_url}/contratos`;
  private listaCambio = new Subject<Contrato[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Contrato[]>(this.url);
  }

  insert(c: Contrato) {
    return this.http.post(this.url, c);
  }

  listId(id: number) {
    return this.http.get<Contrato>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Contrato[]) {
    this.listaCambio.next(listaNueva);
  }

  update(c: Contrato) {
    return this.http.put(this.url, c);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
