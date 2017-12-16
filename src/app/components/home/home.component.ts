import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Pagination2Service } from '../../services/pagination2.service';
import { Router } from '@angular/router';
import { LogoService } from '../../services/logo.service';
import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;


@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  listaPromo: any [] = [];
  carrito: any [] = [];
  pager: any = {};    // pager object
  pagedItems: any[] = [];  // paged items
  empresaCarousel;

  constructor(private _productoServices: ProductoService,
              private _carritoService: CarritoService,
              private _paginationService: Pagination2Service,
              private _router: Router,
              private _logoService: LogoService) {
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
        this.setPage(1);
      }
    );

    this._logoService.consultarLogo()
      .subscribe(
        resultado => {
          let empresa = resultado;
          this.empresaCarousel = empresa[0].imgCarousel;
          console.log(this.empresaCarousel);
        }
      );
  }

  ngOnInit() {

  }

  anadir(promo){
    console.log(promo);
    if (promo.opciones.length === 0){
      promo.cantidad = 1;
      promo.subtotal = promo.cantidad * promo.precio_promo;
      console.log("Boton añadir");
      this._carritoService.añadirProducto(promo);

      //Conseguir productos del carrito
      this.carrito = this._carritoService.getProducto();
      console.log(this.carrito);
      document.getElementById('carrito').innerHTML =
        "<span class=\"fa fa-cart-plus fa-1x \" aria-hidden=\"true\"></span>"+this.carrito.length;
      document.getElementById(promo.id).innerHTML = "<div style='position: absolute; z-index: 100; ' class=\"alert alert-success alert-dismissable\">\n" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n" +
        "   <i class=\"fa fa-check\" aria-hidden=\"true\"></i> <strong>&nbsp Añadido al carrito &nbsp &nbsp</strong>" +
        "</div>";

          swal({
              title: 'Añadido al carrito',
              text: promo.marca + promo.modelo,
              html: '<p>'+promo.marca + promo.modelo+' / $'+promo.precio_promo+'</p>',
              imageUrl: promo.imagen,
              imageWidth: 150,
              imageHeight: 150,
              animation: true,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#00BFFF',
              cancelButtonText: 'Seguir viendo',
              confirmButtonText: 'Ir al Carrito <span class="fa fa-cart-plus fa-1x " aria-hidden="true"></span>',
              }).then((result) => {
                if (result.value) {
                  this._router.navigate(['/carrito']);
                }
          })
      }
    else {
      this._router.navigate(['/producto', promo.id, promo.modelo]);
      window.scrollTo(0,0);
    }
  }

  //PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this._paginationService.getPager(this.listaPromo.length, page);
    // get current page of items
    this.pagedItems = this.listaPromo.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  detalles(){
    window.scrollTo(0,0);
  }

}
