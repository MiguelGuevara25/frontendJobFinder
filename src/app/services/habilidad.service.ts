import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../models/habilidad';

const base_url = enviroment.base;
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
