import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Detalle } from '../models/detalles';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DetallesService {
  private url = `${base_url}/detalles`;
  private listaCambio = new Subject<Detalle[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Detalle[]>(this.url);
  }

  insert(d: Detalle) {
    return this.http.post(this.url, d);
  }

  listId(id: number) {
    return this.http.get<Detalle>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Detalle[]) {
    this.listaCambio.next(listaNueva);
  }

  update(d: Detalle) {
    return this.http.put(this.url, d);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
