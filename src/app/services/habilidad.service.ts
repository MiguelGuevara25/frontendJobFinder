import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../models/habilidad';
import { environment } from '../../environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  private url = `${base_url}/habilidades`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Habilidad[]>(this.url);
  }
}
