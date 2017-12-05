import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaPromo: any [] = [];
  carrito:any[]=[];

  constructor(private _productoServices: ProductoService, private _carritoService: CarritoService) {
    this._productoServices.consultarProductos()
    .subscribe(
      resultado => {
        for (let key in resultado) {
          let marca, imagen ;
          marca = resultado[key].marca;
          imagen = resultado[key].imagen;

          let promoNew = resultado[key];
          promoNew.marca = marca.nombre;
          promoNew.imagen = imagen[0];

          if (promoNew.promocion === true ) {
            this.listaPromo.push(promoNew);
          }
        }
      }
    );
    console.log(this.listaPromo);
  }

  ngOnInit() {
  }

  anadir(promo){
    promo.cantidad = 1;
    promo.subtotal = promo.cantidad * promo.precio_promo;
    console.log("Boton añadir");
    this._carritoService.añadirProducto(promo);

    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
    document.getElementById('carrito').innerHTML =
      "<span class=\"fa fa-cart-plus fa-1x fa-inverse\" aria-hidden=\"true\"></span>"+this.carrito.length;


  }

}
