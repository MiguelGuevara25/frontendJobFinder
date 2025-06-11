import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Certificado } from '../models/certificado';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private url = `${base_url}/certificados`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Certificado[]>(this.url);
  }
}
