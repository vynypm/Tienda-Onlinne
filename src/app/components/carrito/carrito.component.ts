import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private _carritoService: CarritoService) {
    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
  }

  ngOnInit() {
  }

  eliminarProducto(item){
    this._carritoService.eliminarProducto(item);
  }
  total:number = 0;
  keyPress(event: KeyboardEvent,i){
    console.log(i);
    console.log(String.fromCharCode(event.charCode));
    var num = parseInt(String.fromCharCode(event.charCode));
    if(!isNaN(num) || num <= 0){
      var precio = document.getElementById('precio_'+i).innerText;
      console.log(precio);
      var subtotal = num * parseInt(precio);
      document.getElementById('subtotal_'+i).innerText = String(subtotal);
      this.total = subtotal + this.total;
      document.getElementById('total').innerText = String(this.total);
    }else {
      console.log("es letra");
    }

  }



}
