import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private url = `${base_url}/empresas`;
  private listaCambio = new Subject<Empresa[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Empresa[]>(this.url);
  }

  insert(e: Empresa) {
    return this.http.post(this.url, e);
  }

  listId(id: number) {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Empresa[]) {
    this.listaCambio.next(listaNueva);
  }

  update(e: Empresa) {
    return this.http.put(this.url, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
