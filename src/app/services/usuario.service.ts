import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const us_base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private us_url = `${us_base_url}/usuarios`
  private listaCambio = new Subject<Usuario[]>()
  constructor(private us_http: HttpClient) { }
  
  listar(){
    return this.us_http.get<Usuario[]>(this.us_url)
  }
  registrar(usuario: Usuario){
    return this.us_http.post(this.us_url, usuario)
  }
  setList(listanueva: Usuario[]){
    this.listaCambio.next(listanueva);
  }
}
