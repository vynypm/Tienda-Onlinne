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

    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto().length;
    console.log(this._carritoService.getProducto().length);
  }

  salir() {
    sessionStorage.removeItem('Cliente');
    this._router.navigate(['/login']);
  }

}
