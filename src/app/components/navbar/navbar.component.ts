import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { LogoService } from '../../services/logo.service';
import { HostListener} from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import {ProductoService} from '../../services/producto.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser"; //Autocomplete
import { FormControl, FormBuilder} from '@angular/forms';
import {ClienteService} from '../../services/cliente.service';
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
  productos: any[] = [];
  public buscador: FormControl;
  email:any;
  cliente: any;
  facebookUrl;
  youtubeUrl;
  twitterUrl;
  googleUrl;

  constructor(private _router: Router,
              private _usuarioServices: UsuarioService,
              private _clienteServices: ClienteService,
              private _carritoService: CarritoService,
              private _logoService: LogoService,
              @Inject(DOCUMENT) private document: Document,
              private builder: FormBuilder, private _sanitizer: DomSanitizer, private _productoServices: ProductoService) {
    window.scrollTo(0,0);
    //io.sails.url="https://store-onlinne.herokuapp.com/";
    this._logoService.consultarLogo()
      .subscribe(
        resultado => {
          let empresa = resultado;
          //console.log(empresa);
          //console.log(empresa[0].nombre);
          this.empresaNombre = empresa[0].nombre;
          this.empresaImg = empresa[0].imgLogo;
          if (empresa[0].linkFacebook !== "") {
            this.facebookUrl = empresa[0].linkFacebook;
          }

          if (empresa[0].linkYoutube !== "") {
            this.youtubeUrl = empresa[0].linkYoutube;
          }

          if (empresa[0].linkTwitter !== "") {
            this.twitterUrl = empresa[0].linkTwitter;
          }

          if (empresa[0].linkGoogle !== "") {
            this.googleUrl = empresa[0].linkGoogle;
          }
        }
      );

    this._productoServices.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {
            let prodnew = resultado[key];
            this.productos.push(prodnew); //Guardo todos los productos
          }
        }
      );
    console.log(this.productos);
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
    this.buscador = new FormControl(''); //form del buscador

    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      console.log(result);
      if (result != false) {
        console.log("Usted esta logeado PLEASE");
        this.email = sessionStorage.getItem('Cliente'); // Guardar el email del usuario que inició sesion
        console.log(this.email);
      }
    });

    this._clienteServices.consultarCliente().subscribe(
      respuesta => {
        for (let key$ in respuesta ) {
          let usuarioNew = respuesta[key$];
          if (usuarioNew.email === this.email){
            this.cliente = usuarioNew.nombre;
          }
        }
      }
    )

    this.onResize();

  }

  salir() {
    sessionStorage.removeItem('Cliente');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

/*
@HostListener("window:scroll")
  onWindowScroll() {
    //console.log(window.innerWidth);
    if( window.scrollY >  1){
      $("nav").addClass('mainNav2 sticky-top');
      $("nav").removeClass('mainNav ');
      //console.log("mayor")
    } else {
      $("nav").addClass('mainNav ');
      $("nav").removeClass('mainNav2 sticky-top');
    }
  }*/

@HostListener("window:resize")
  onResize(){
    console.log(window.innerWidth);
    if(window.innerWidth < 768){
      $(".cambiarDiv").addClass('ocultar');
      $(".cambiarNav").removeClass('ocultar');
      $(".cambiarNav").addClass('mostrar');
    }
    else {
      $(".cambiarDiv").removeClass('ocultar');
      $(".cambiarNav").removeClass('mostrar');
      $(".cambiarNav").addClass('ocultar');
    }
  }

  //Funcion para autocompletar el buscador
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.modelo}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  buscar(id, modelo){
    this._router.navigate(['/producto', id, modelo]);
  }
}
