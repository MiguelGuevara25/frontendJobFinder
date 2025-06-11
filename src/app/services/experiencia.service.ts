import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../models/experiencia';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private url = `${base_url}/experiencias`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Experiencia[]>(this.url);
  }
}
