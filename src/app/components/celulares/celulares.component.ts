import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto.interface';
import {ProductoService} from '../../services/producto.service';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css']
})
export class CelularesComponent implements OnInit {

  listaCelulares: Producto [] = [];


  constructor(private _productoServices: ProductoService) {
    this._productoServices.consultarProductos()
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

            this.listaCelulares.push(celularNew);
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
