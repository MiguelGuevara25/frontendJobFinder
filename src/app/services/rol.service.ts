import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Rol[]>(this.url);
  }
  registrar(rol: Rol) {
    return this.http.post(this.url, rol)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }
  update(a: Rol) {
    return this.http.put(this.url, a);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
