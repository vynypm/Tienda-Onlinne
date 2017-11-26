import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {Pedido} from '../../interfaces/pedido.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: any;
  carritoCompra: any[]=[]; //Variable para enviar al pedido
  habilitar:boolean = false;
  pedido: Pedido = {
    carritopedido: [],
    preciototal: 0,
    email:""
  };

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
    if (estadopagina === "complete" || estadopagina === "loading"){
      //console.log(document.getElementById('carritoCompras'));
      if(this.carrito.length === 0){
        document.getElementById('carritoCompras').innerHTML = "<h2>No hay productos en la cesta</h2>";
        this.habilitar = true;
      }
    }
  }

  eliminarProducto(producto){
      var indice;
      for ( let key in this.carrito){
          if (this.carrito[key] === producto){
              indice = key;
          }
      }
      this._carritoService.eliminarProducto(indice);
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
    if(this.total == 0){
      document.getElementById('carritoCompras').innerHTML = "<h2>No hay productos en la cesta</h2>";
      this.habilitar = true;
    }

  }

  comprar(){
    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      console.log(result);
      if (result === true) {
        console.log("Usted esta logeado PLEASE");
        this.carritoCompra = this._carritoService.getProducto(); //Guardar los productos almacenados en el carrito
        var email = sessionStorage.getItem('Cliente'); // Guardar el email del usuario que inició sesion
        console.log(this.pedido.carritopedido);
        this.pedido.carritopedido = this.carritoCompra;
        this.pedido.preciototal = this.total;
        this.pedido.email = email;
        console.log(this.pedido);
        localStorage.pedido = JSON.stringify(this.pedido);
        this._router.navigate(['/verificar']);
      }
      else {
        console.log("Registresessee");
        this._router.navigate(['/login']);
      }
    });


  }

}
