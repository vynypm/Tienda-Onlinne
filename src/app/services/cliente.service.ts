import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Cliente } from '../interfaces/cliente.interface';
import 'rxjs/Rx';

@Injectable()
export class ClienteService {

  clienteSails: string = 'http://port-1337.tienda-vynypm52876.codeanyapp.com/Cliente';

  constructor(private _http: Http) {
  }

  nuevoCliente(cliente: Cliente) {

    return this._http.post(this.clienteSails, JSON.stringify(cliente)).map(
      res => {
        return res.json();
      }
    );
  }

  consultarCliente() {
    return this._http.get(this.clienteSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }

  editarCliente(cliente: Cliente, id: string) {
    let body= JSON.stringify(cliente);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.clienteSails}/${id }`;
    return this._http.put(url, body, {headers: headers}).map(
      resultado => {
        return resultado.json;
      }
    );
  }
}
