import { Injectable } from '@angular/core';
import {Producto} from '../interfaces/producto.interface';
import 'rxjs/Rx';


@Injectable()
export class CarritoService {
  item: any[]=[];
  añadirProducto(producto: Producto) {
    this.item.push(producto);
    console.log(this.item);
  }

  getProducto(): Producto[] {
    //console.log(this.item);
    return this.item
  }

  eliminarProducto(producto: Producto) {
    this.item.splice(this.item.indexOf(producto), 1);
    console.log(this.item);
  }
}
