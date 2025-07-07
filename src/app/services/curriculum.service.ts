import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Curriculum } from '../models/curriculum';
import { Observable, Subject } from 'rxjs';
import { CuriculumPromedioDTO } from '../models/CuriculumPromedioDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private url = `${base_url}/curriculum`;
  private listaCambio = new Subject<Curriculum[]>();
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Curriculum[]>(this.url);
  }

  insertar(curriculum: Curriculum) {
    return this.http.post(this.url, curriculum);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Curriculum[]) {
    this.listaCambio.next(listaNueva);
  }
  listarId(id: number) {
    return this.http.get<Curriculum>(`${this.url}/${id}`);
  }

  update(curriculum: Curriculum) {
    return this.http.put(this.url, curriculum);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getPromedio(): Observable<CuriculumPromedioDTO[]> {
    return this.http.get<CuriculumPromedioDTO[]>(`${this.url}/Promedio`);
  }
}
