/**
 * Created by paul on 14/8/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UsuarioFooter } from '../interfaces/usuario.footer.interface';


@Injectable()
export class UsuarioFooterService {

  usuarioURL: string = "https://pokemon-85848.firebaseio.com/pokemon.json";

  constructor( private _http: Http) { }

  nuevoUsuario(nuevo: UsuarioFooter) {
    let body = JSON.stringify(nuevo);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.usuarioURL, body, {headers: headers})
      .map(
        res => {
          console.log(res.json);
          return res.json;
        }
      );
  }
}
