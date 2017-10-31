import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';//para el map

@Injectable()
export class CategoriaService {
  urlCategorias: string ='http://port-1337.tienda-vynypm52876.codeanyapp.com/categorias';

  constructor(private _http: Http) { }

  nuevaCategoria(categoria: any) {
    let body = JSON.stringify(categoria);

    return this._http.post(this.urlCategorias, body).map(
      res => {
        return res.json();
      }
    );
  }

  consultarCategorias() {
    return this._http.get(this.urlCategorias).map(
      res => {
        return res.json();
      }
    );
  }

  consultarCategoria(id: string) {
    let urlCategoria = `${this.urlCategorias}/${id}`;

    return this._http.get(urlCategoria)
      .map(
        res => {
          return res.json();
        }
      );
  }

  editarCategoria(categoria: any, id: string) {
    let body = JSON.stringify(categoria);

    let urlCategoria = `${this.urlCategorias}/${id}`;
    return this._http.put(urlCategoria, body)
      .map(
        res => {
          return res.json();
        }
      );
  }

  eliminarCategoria(key$: string) {
    let url = `${this.urlCategorias}/${key$}`;
    return this._http.delete(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

}
