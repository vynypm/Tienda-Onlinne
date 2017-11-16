import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  hide: boolean = true;
  carrito: any;

  constructor(private _router: Router, private _usuarioServices: UsuarioService, private _carritoService: CarritoService) { }

  ngOnInit() {
    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      console.log(result);
      if (!result) {
        console.log(result);
        this.hide = false;
      }
    });

    this.carrito = this._carritoService.getProducto();


   /* if (!isNaN(this._carritoService.getProducto().length)){
      //Conseguir productos del carrito
      this.carrito = this._carritoService.getProducto().length;
      console.log(this._carritoService.getProducto().length);
    }else {
      console.log("Cesta vacia");
    }*/
  }

  salir() {
    sessionStorage.removeItem('Cliente');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
