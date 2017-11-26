import { Injectable } from '@angular/core';
import {Producto} from '../interfaces/producto.interface';
import 'rxjs/Rx';


@Injectable()
export class CarritoService {
  item: any[]=[];
  añadirProducto(producto: Producto) {
    this.item.push(producto);
    if (typeof(Storage) !== 'undefined') {
      localStorage.cesta = JSON.stringify(this.item);
    }
    console.log(this.item);
  }

  getProducto(): Producto[] {
    if (localStorage.cesta != null && localStorage.cesta != "" &&
        localStorage.cesta != false && localStorage.cesta != undefined){
      console.log("Si existe");
      console.log(JSON.parse(localStorage.cesta));
      var carritoSorage = JSON.parse(localStorage.cesta);
      this.item = carritoSorage;
      console.log(this.item);
      return this.item
    }else {
      console.log("No Existe");
      return this.item = [];
    }

  }

  eliminarProducto(indice) {
    /*var carritoSorage = JSON.parse(localStorage.cesta);
    this.item = carritoSorage;
    console.log(this.item);*/
    console.log(indice);
    //console.log(this.item.indexOf(producto));
    //var pos = this.item.indexOf(producto)
    //console.log(pos);

    this.item.splice(indice,1);
    if (typeof(Storage) !== 'undefined') {
      localStorage.cesta = JSON.stringify(this.item);
    }
    console.log(this.item);
  }
}
