import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { inscripcionCurso } from '../models/inscripcionCurso';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class InscripcioncursoService {
  private url = `${base_url}/inscripcioncursos`;
  private listaCambio = new Subject<inscripcionCurso[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<inscripcionCurso[]>(this.url);
  }
  listId(id: number) {
    return this.http.get<inscripcionCurso>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable(); 
  }

  setList(listaNueva: inscripcionCurso[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
