import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Certificado } from '../models/certificado';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private url = `${base_url}/certificados`;
  private listaCambio = new Subject<Certificado[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Certificado[]>(this.url);
  }
  insert(c: Certificado) {
    return this.http.post(this.url, c);
  }
  listId(id: number) {
    return this.http.get<Certificado>(`${this.url}/${id}`);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Certificado[]) {
    this.listaCambio.next(listaNueva);
  }
  update(c: Certificado) {
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
