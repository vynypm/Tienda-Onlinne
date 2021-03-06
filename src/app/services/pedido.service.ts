import { Injectable } from '@angular/core';
import {Pedido} from '../interfaces/pedido.interface';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class PedidoService {

  pedidoSails: string = 'https://store-onlinne.herokuapp.com/pedidos';

  constructor(private _http: Http) { }

  nuevoPedido(pedido: Pedido) {
    return this._http.post(this.pedidoSails,JSON.stringify(pedido)).map(
      resultado => {
        return resultado.json();
      }
    );
  }

  consultarPedido() {
    return this._http.get(this.pedidoSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }

  editarProducto(pedido: Pedido, id: string) {
    let body= JSON.stringify(pedido);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.pedidoSails}/${id }`;
    return this._http.put(url, body, {headers: headers}).map(
      resultado => {
        return resultado.json;
      }
    );
  }

  /*

  getProducto(indice: string) {
    let url = `${this.productosSails}/${ indice }`;
    return this._http.get(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

  eliminarProducto(key$: string) {
    let url = `${this.productosSails}/${key$}`;
    return this._http.delete(url)
      .map(
        res => {
          return res.json();
        }
      );
  }
  */
}

