import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';//para el map

@Injectable()
export class OpcionService {
  urlOpciones: string ='http://port-1337.tienda-vynypm52876.codeanyapp.com/Opciones';

  constructor(private _http: Http) { }

  nuevaOpcion(opcion: any) {
    let body = JSON.stringify(opcion);

    return this._http.post(this.urlOpciones, body).map(
      res => {
        return res.json();
      }
    );
  }

  consultarOpciones() {
    return this._http.get(this.urlOpciones).map(
      res => {
        return res.json();
      }
    );
  }

  consultarOpcion(id: string) {
    let urlOpciones = `${this.urlOpciones}/${id}`;

    return this._http.get(urlOpciones)
      .map(
        res => {
          return res.json();
        }
      );
  }

  editarOpcion(opcion: any, id: string) {
    let body = JSON.stringify(opcion);

    let urlOpciones = `${this.urlOpciones}/${id}`;
    return this._http.put(urlOpciones, body)
      .map(
        res => {
          return res.json();
        }
      );
  }

  eliminarOpcion(key$: string) {
    let url = `${this.urlOpciones}/${key$}`;
    return this._http.delete(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

}
