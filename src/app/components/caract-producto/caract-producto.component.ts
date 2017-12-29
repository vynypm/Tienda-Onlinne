import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Pagination2Service } from '../../services/pagination2.service';
import { CarritoService } from '../../services/carrito.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-caract-producto',
  templateUrl: './caract-producto.component.html',
  styleUrls: ['./caract-producto.component.css']
})
export class CaractProductoComponent implements OnInit {

  allImages: any = {
    url:""
  };

  allOptions: any = {
    opciones:""
  };

  splittedDescriipcion;

  catSimilar = null;

  prodCategoria: any [] = [];

  producto: any = {
    marca: "",
    modelo: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    categoria: "",
    promocion: false,
    precio_promo: null,
    opciones: ""
  }
// pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];
  carrito: any [] = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private _productoService: ProductoService,
              private _paginationService: Pagination2Service,
              private _carritoService: CarritoService,
              private _router: Router) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this._productoService.getProducto(parametros['id']).subscribe(
          resultado => {

            this.allImages.url = resultado.imagen;
            this.allOptions.opciones = resultado.opciones;

            let marca, categoria ;
            marca = resultado.marca;
            categoria = resultado.categoria;

            this.producto = resultado;
            this.producto.marca = marca.nombre;
            this.producto.imagen = this.allImages.url[0];
            this.producto.opciones = this.allOptions.opciones[0];
            this.catSimilar = categoria.nombre;
            //console.log(this.producto.imagen);
            this.mismaCategoria();

            let str = this.producto.descripcion;
            this.splittedDescriipcion = str.split("+");
            console.log(this.splittedDescriipcion);
          }
        );
      }
    );

  }

  ngOnInit() {

  }

  mismaCategoria() {
    this.prodCategoria = [];
    this._productoService.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {

            let marca, imagen, categoria ;

            marca = resultado[key].marca;
            imagen = resultado[key].imagen;
            categoria = resultado[key].categoria;

            let productoNew = resultado[key];
            productoNew.marca = marca.nombre;
            productoNew.imagen = imagen[0];
            productoNew.categoria = categoria.nombre;

            if (productoNew.categoria === this.catSimilar ) {
              this.prodCategoria.push(productoNew);
              this.setPage(1);
            }
          }
        }
      );
  }

  cambiarImg(img: string) {
    //console.log(img);
    this.producto.imagen = img;
  }

  //PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._paginationService.getPager(this.prodCategoria.length, page);

    // get current page of items
    this.pagedItems = this.prodCategoria.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  anadir() {
    console.log(this.producto);
    this.producto.cantidad = 1;
    this.producto.subtotal = this.producto.cantidad * this.producto.precio_promo;
    console.log("Boton añadir");
    this._carritoService.añadirProducto(this.producto);

    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
    document.getElementById('carrito').innerHTML =
      "<span class=\"fa fa-cart-plus fa-1x \" aria-hidden=\"true\"></span>"+this.carrito.length;

    this._router.navigate(['/carrito']);
  }

  anadir2(item){
    console.log(item.opciones.length);
    if (item.opciones.length === 0){
      item.cantidad = 1;
      item.subtotal = item.cantidad * item.precio_promo;
      console.log("Boton añadir");
      this._carritoService.añadirProducto(item);

      //Conseguir productos del carrito
      this.carrito = this._carritoService.getProducto();
      console.log(this.carrito);
      document.getElementById('carrito').innerHTML =
        "<p style='color: black'>Carrito <i class=\"fa fa-cart-plus fa-1x \" aria-hidden=\"true\"></i>"+this.carrito.length+"</p>";
      document.getElementById(item.id).innerHTML = "<div style='position: absolute; z-index: 100; ' class=\"alert alert-success alert-dismissable\">\n" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n" +
        "   <i class=\"fa fa-check\" aria-hidden=\"true\"></i> <strong>&nbsp Añadido al carrito &nbsp &nbsp</strong>" +
        "</div>";
          swal({
            title: 'Añadido al carrito',
            text: item.marca + item.modelo,
            html: '<p>'+item.marca + item.modelo+'</p>',
            imageUrl: item.imagen,
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
      this._router.navigate(['/producto', item.id, item.modelo]);
      window.scrollTo(0,0);
    }
  }

  detalles(){
    window.scrollTo(0,0);
  }

}
