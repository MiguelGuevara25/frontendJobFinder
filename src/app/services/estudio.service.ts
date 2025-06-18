import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudio } from '../models/estudio';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EstudioService {
  private url = `${base_url}/estudios`;
  private listaCambio = new Subject<Estudio[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Estudio[]>(this.url);
  }

  insert(e: Estudio) {
    return this.http.post(this.url, e);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Estudio[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Estudio>(`${this.url}/${id}`);
  }

  update(e: Estudio) {
    return this.http.put(this.url, e);
  }

  delete(id: Number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
