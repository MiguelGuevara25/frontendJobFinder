import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Curso } from '../models/curso';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url = `${base_url}/cursos`;
  private listaCambio = new Subject<Curso[]>();
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<Curso[]>(this.url);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
