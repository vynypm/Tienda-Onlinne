import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser"; //Autocomplete
import { FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  productos: any[] = [];

  public buscador: FormControl;
  constructor(private builder: FormBuilder, private _sanitizer: DomSanitizer, private _productoServices: ProductoService) {
    this._productoServices.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {
            let prodnew = resultado[key];
            this.productos.push(prodnew); //Guardo todos los productos
          }
        }
      );
    console.log(this.productos);
  }

  ngOnInit() {
    this.buscador = new FormControl(''); //form del buscador
  }

  //Funcion para autocompletar el buscador
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.modelo}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
