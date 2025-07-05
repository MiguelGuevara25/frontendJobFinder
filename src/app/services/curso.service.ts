import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Curso } from '../models/curso';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CantidadCursosPlataformaDTO } from '../models/CantidadCursosPlataformaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private url = `${base_url}/cursos`;
  private listaCambio = new Subject<Curso[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Curso[]>(this.url);
  }
  insert(c: Curso) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Curso[]) {
    this.listaCambio.next(listaNueva);
  }
  update(c: Curso) {
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
      return this.http.get<Curso>(`${this.url}/${id}`);
    }
  getcantidadCursosPlataforma(): Observable<CantidadCursosPlataformaDTO[]> {
      return this.http.get<CantidadCursosPlataformaDTO[]>(`${this.url}/cantidades`);
  }
}
