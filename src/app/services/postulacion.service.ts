import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Postulacion } from '../models/postulacion';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PostulacionService {
  private url = `${base_url}/postulacion`;
  private listaCambio = new Subject<Postulacion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Postulacion[]>(this.url);
  }

  insert(d: Postulacion) {
    return this.http.post(this.url, d);
  }

  listId(id: number) {
    return this.http.get<Postulacion>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Postulacion[]) {
    this.listaCambio.next(listaNueva);
  }

  update(d: Postulacion) {
    return this.http.put(this.url, d);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
