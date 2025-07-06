import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../models/habilidad';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HabilidadVacia } from '../models/habilidadvacia';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  private url = `${base_url}/habilidades`;
  private listaCambio = new Subject<Habilidad[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Habilidad[]>(this.url);
  }

  insert(h: Habilidad) {
    return this.http.post(this.url, h);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Habilidad[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Habilidad>(`${this.url}/${id}`);
  }

  update(h: Habilidad) {
    return this.http.put<Habilidad>(this.url, h);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  habilidadesSinUsuarios() {
    return this.http.get<HabilidadVacia[]>(`${this.url}/habilidad_nulas`);
  }
}
