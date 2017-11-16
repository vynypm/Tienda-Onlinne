import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: any;
  carritoCompra: any[]=[]; //Variable para enviar al pedido

  constructor(private _carritoService: CarritoService, private _router: Router, private _usuarioServices: UsuarioService) {
    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
    /*var carritoSorage = JSON.parse(localStorage.cesta);
    this.carrito = carritoSorage;
    console.log(this.carrito);*/
  }

  ngOnInit() {
    var estadopagina = document.readyState;
    console.log(estadopagina);
    if (estadopagina === "complete"){
      console.log(document.getElementById('carritoCompras'));
      if(this.carrito.length === 0){
        document.getElementById('carritoCompras').innerHTML = "<p>No hay productos en la cesta</p>"
      }

    }

  }

  eliminarProducto(item){
    this._carritoService.eliminarProducto(item);
    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
    console.log(this.carrito.length);
    document.getElementById('carrito').innerHTML =
      "<span class=\"fa fa-cart-plus fa-1x fa-inverse\" aria-hidden=\"true\"></span>"+this.carrito.length;
  }

  keyPress(event: KeyboardEvent,i){
    console.log(i);
    console.log(String.fromCharCode(event.charCode));
    var num = parseInt(String.fromCharCode(event.charCode));
    if(!isNaN(num)){
      var precio = document.getElementById('precio_'+i).innerText;
      console.log(precio);
      var subtotal = num * parseFloat(precio);
      document.getElementById('subtotal_'+i).innerText = String(subtotal.toFixed(2));
    }else {
      //var aux = document.getElementById('cantidad_'+i);
      //console.log(aux);
      //aux.setAttribute('value','1');
      console.log("Valor ingresado incorrecto")
    }

  }

  movimiento(event){
    var totalcarrito = 0;
    for( let key in this.carrito){
      if(document.getElementById('subtotal_'+key)!= null){
        var num = document.getElementById('subtotal_'+key).innerText.split('$');
        var subtotal = parseFloat(num[1].replace(/[,]/g,"")); //Reemplazo la coma por el vacio
        //console.log(subtotal);
        this.carrito[key].subtotal = subtotal //Guardo el subtotal del producto
        totalcarrito = subtotal + totalcarrito;
      }
    }
    this.total = totalcarrito.toFixed(2);
    document.getElementById('total').innerHTML = "USD $ "+this.total;
    if (typeof(Storage) !== 'undefined') {
      localStorage.cesta = JSON.stringify(this.carrito);
    }

  }

  comprar(){
    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      console.log(result);
      if (result === true) {
        console.log("Usted esta logeado PLEASE");
        console.log(this.total);
        //Conseguir productos del carrito
        this.carritoCompra = this._carritoService.getProducto();
        console.log(this.carritoCompra);
        var email = sessionStorage.getItem('Cliente');
        console.log(email);
        this._router.navigate(['/verificar']);
      }
      else {
        console.log("Registresessee")
        this._router.navigate(['/login']);
      }
    });


  }

}
