import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InscripcionCurso } from '../models/inscripcionCurso';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class InscripcioncursoService {
  private url = `${base_url}/inscripcioncursos`;
  private listaCambio = new Subject<InscripcionCurso[]>();

  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<InscripcionCurso[]>(this.url);
    }
    insert(iC: InscripcionCurso) {
      return this.http.post(this.url, iC);
    }
    listId(id: number) {
      return this.http.get<InscripcionCurso>(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: InscripcionCurso[]) {
      this.listaCambio.next(listaNueva);
    }
    update(iC: InscripcionCurso) {
      return this.http.put(this.url, iC);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
