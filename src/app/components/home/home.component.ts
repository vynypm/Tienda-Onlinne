import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaPromo: any [] = [];


  constructor(private _productoServices: ProductoService) { this._productoServices.consultarProductos()
    .subscribe(
      resultado => {
        for (let key in resultado) {
          let marca, imagen ;
          marca = resultado[key].marca;
          imagen = resultado[key].imagen;
          let celularNew = resultado[key];
          celularNew.marca = marca.nombre;
          celularNew.imagen = imagen[0];
          //console.log(imagen);
          if (celularNew.promocion === true ){
            this.listaPromo.push(celularNew);
          }

        }
        //this.listaCelulares = resultado;
        //console.log(resultado[0].marca);
        //console.log(this.listaCelulares);
      }
    );
  }

  ngOnInit() {
  }

}
