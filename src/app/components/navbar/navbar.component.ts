import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { LogoService } from '../../services/logo.service';
import { HostListener} from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  hide: boolean = true;
  carrito: any;
  empresaImg: string;
  empresaNombre: string;

  constructor(private _router: Router,
              private _usuarioServices: UsuarioService,
              private _carritoService: CarritoService,
              private _logoService: LogoService,
              @Inject(DOCUMENT) private document: Document) {
    //io.sails.url="https://store-onlinne.herokuapp.com/";
    this._logoService.consultarLogo()
      .subscribe(
        resultado => {
          let empresa = resultado;
          //console.log(empresa);
          //console.log(empresa[0].nombre);
          this.empresaNombre = empresa[0].nombre;
          this.empresaImg = empresa[0].imgLogo;
        }
      );


  }

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

  @HostListener("window:scroll")
  onWindowScroll() {
    //console.log(window.scrollY)
    if( window.scrollY >  450){
      $("nav").addClass('mainNav2');
      $("nav").removeClass('mainNav');
      //console.log("mayor")
    } else {
      $("nav").addClass('mainNav');
      $("nav").removeClass('mainNav2');
    }
  }
}
