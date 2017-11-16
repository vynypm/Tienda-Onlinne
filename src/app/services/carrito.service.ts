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

  eliminarProducto(producto: Producto) {
    var carritoSorage = JSON.parse(localStorage.cesta);
    this.item = carritoSorage;
    console.log(this.item);
    this.item.splice(this.item.indexOf(producto), 1);
    if (typeof(Storage) !== 'undefined') {
      localStorage.cesta = JSON.stringify(this.item);
    }
    console.log(this.item);
  }
}
