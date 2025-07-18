import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject } from 'rxjs';
import { usuariosActivosDTO } from '../models/usuariosActivosDTO';
import { UsuariosContratoActivoDTO } from '../models/usuariosContratoActivoDTO';

const us_base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${us_base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }

  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  setList(listanueva: Usuario[]) {
    this.listaCambio.next(listanueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listarId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  actualizar(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarActivos(estado: boolean): Observable<usuariosActivosDTO[]> {
    return this.http.get<usuariosActivosDTO[]>(
      `${this.url}/activos?estado=${estado}`
    );
  }
  
  getContratosActivos(): Observable<UsuariosContratoActivoDTO[]> {
    return this.http.get<UsuariosContratoActivoDTO[]>(
      `${this.url}/contratosactivos`
    );
  }
}
