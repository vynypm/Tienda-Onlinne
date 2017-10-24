import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';//para el map

@Injectable()
export class MarcaService {
  urlMarcas: string ='http://port-1337.tienda-vynypm52876.codeanyapp.com/marcas';

  constructor(private _http: Http) { }

  nuevaMarca(marca: any) {
    let body = JSON.stringify(marca);

    return this._http.post(this.urlMarcas, body).map(
      res => {
        return res.json();
      }
    );
  }

  consultarMarcas() {
    return this._http.get(this.urlMarcas).map(
      res => {
        return res.json();
      }
    );
  }

  consultarMarca(id: string) {
    let urlMarca = `${this.urlMarcas}/${id}`;

    return this._http.get(urlMarca)
      .map(
        res => {
          return res.json();
        }
      );
  }

  editarMarca(marca: any, id: string) {
    let body = JSON.stringify(marca);

    let urlMarca = `${this.urlMarcas}/${id}`;
    return this._http.put(urlMarca, body)
      .map(
        res => {
          return res.json();
        }
      );
  }

}
