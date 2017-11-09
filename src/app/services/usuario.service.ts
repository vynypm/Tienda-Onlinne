import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from '../interfaces/usuario.interface';

import 'rxjs/Rx';

@Injectable()
export class UsuarioService {

  usuarioSails: string = 'http://port-1337.tienda-vynypm52876.codeanyapp.com/usuarios';

  constructor(private _http: Http) { }

  nuevoUsuario(usuario: Usuario) {

    return this._http.post(this.usuarioSails,JSON.stringify(usuario)).map(

      res => {
        return res.json();
      }
    );
  }

  consultarUsuarios() {
    return this._http.get(this.usuarioSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }


  editarUsuario(producto: Usuario, id: string) {
    let body= JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.usuarioSails}/${id }`;
    return this._http.put(url, body, {headers: headers}).map(
      resultado => {
        return resultado.json;
      }
    );
  }

  getUsuario(indice: string) {
    let url = `${this.usuarioSails}/${ indice }`;
    return this._http.get(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

  eliminarUsuario(key$: string) {
    let url = `${this.usuarioSails}/${key$}`;
    return this._http.delete(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

  isLogged():Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      if (sessionStorage.getItem('Usuario')) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  isLogged_cliente():Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      if (sessionStorage.getItem('Cliente')) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }


}

