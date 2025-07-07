import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../models/experiencia';
import { Subject } from 'rxjs';
import { PromedioExperienciaLaboral } from '../models/PromedioExperienciaLaboral';
import { DuracionPromedioPorPuesto } from '../models/DuracionPromedioPorPuesto';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private url = `${base_url}/experiencias`;
  private listaCambio = new Subject<Experiencia[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Experiencia[]>(this.url);
  }

  insert(e: Experiencia) {
    return this.http.post(this.url, e);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Experiencia[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Experiencia>(`${this.url}/${id}`);
  }

  update(e: Experiencia) {
    return this.http.put<Experiencia>(this.url, e);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getPromedioExperienciaLaboral() {
    return this.http.get<PromedioExperienciaLaboral[]>(
      `${this.url}/Promedio_experiencia_laboral`
    );
  }

  getDuracionPromedioPorPuesto() {
    return this.http.get<DuracionPromedioPorPuesto[]>(
      `${this.url}/duracion_promedio`
    );
  }
}
