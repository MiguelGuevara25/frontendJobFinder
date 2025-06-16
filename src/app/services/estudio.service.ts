import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudio } from '../models/estudio';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EstudioService {
  private url = `${base_url}/estudios`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Estudio[]>(this.url);
  }
}
