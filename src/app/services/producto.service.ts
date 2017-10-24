import { Injectable } from '@angular/core';
import {Producto} from '../interfaces/registro.interface';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductoService {

  productosSails: string = 'http://port-1337.tienda-vynypm52876.codeanyapp.com/productos';
  categoriaSails: string = 'http://port-1337.tienda-vynypm52876.codeanyapp.com/Categorias';
  pedidosSails: string = 'http://port-1337.vinicioservidor-vynypm52876.codeanyapp.com/pedidos';

  constructor(private _http: Http) { }

  nuevoProducto(producto: Producto) {
    return this._http.post(this.productosSails,JSON.stringify(producto)).map(
      resultado => {
        return resultado.json();
      }
    );
  }

  consultarCategoria() {
    return this._http.get(this.categoriaSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }

  consultarProductos() {
    return this._http.get(this.productosSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }

  consultarPedidos() {
    return this._http.get(this.pedidosSails)
      .map(
        respuesta => {
          return respuesta.json();
        }
      );
  }

  editarProducto(producto: Producto, id: string) {
    let body= JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.productosSails}/${id }`;
    return this._http.put(url, body, {headers: headers}).map(
      resultado => {
        return resultado.json;
      }
    );
  }

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
}
