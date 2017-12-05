import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';//para el map

@Injectable()
export class LogoService {
  urlLogo: string ='https://store-onlinne.herokuapp.com/links';

  constructor(private _http: Http) { }

  nuevoLogo(logo: any) {
    let body = JSON.stringify(logo);

    return this._http.post(this.urlLogo, body).map(
      res => {
        return res.json();
      }
    );
  }

  consultarLogo() {
    return this._http.get(this.urlLogo).map(
      res => {
        return res.json();
      }
    );
  }

  getLogo(indice: string) {
    let url = `${this.urlLogo}/${ indice }`;
    return this._http.get(url)
      .map(
        res => {
          return res.json();
        }
      );
  }

  editarLogo(logo: any, id: string) {
    let body = JSON.stringify(logo);

    let url = `${this.urlLogo}/${id}`;
    return this._http.put(url, body)
      .map(
        res => {
          return res.json();
        }
      );
  }

}
