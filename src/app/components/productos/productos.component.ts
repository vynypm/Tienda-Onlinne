import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { PaginationService } from '../../services/pagination.service';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaCategorias: any[] = [];
  filtroCategoria: string = null;
  listaProductos: Producto [] = [];
  habilitar: boolean = false;

  carrito:any [] = [];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];
  constructor(private _categoriaService: CategoriaService,
              private _productoServices: ProductoService,
              private _paginationService: PaginationService,
              private _carritoService: CarritoService,
              private _router: Router) {

    this._categoriaService.consultarCategorias()
      .subscribe(
        resultado => {
          this.listaCategorias = resultado;
          //console.log(this.listaCategorias);
        }
      );

    this.consultarProductos();
  }

  ngOnInit() {
  }

  consultarProductos() {
    this.habilitar = true;
    this._productoServices.consultarProductos()
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

            if (this.filtroCategoria === null ) {
              this.listaProductos.push(productoNew);
            }else if (productoNew.categoria === this.filtroCategoria ) {
              this.listaProductos.push(productoNew);
            }
          }
          this.habilitar = false;
          this.setPage(1);
        }
      );
  }

  filtrarCategoria(categoria: string) {
    this.filtroCategoria = categoria;
    this.listaProductos = [];
    this.consultarProductos();
    console.log(this.filtroCategoria);
  }

  productosPromo() {
    this.listaProductos = [];
    this.habilitar = true;
    console.log(this.habilitar);
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
              this.listaProductos.push(promoNew);
            }

          }
          this.habilitar = false;
          this.setPage(1);
        }
      );
  }

  //PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this._paginationService.getPager(this.listaProductos.length, page);
    // get current page of items
    this.pagedItems = this.listaProductos.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  anadir(cell) {
    console.log(cell.opciones);
    if (cell.opciones.length === 0){
      cell.cantidad = 1;
      cell.subtotal = cell.cantidad * cell.precio_promo;
      console.log("Boton añadir");
      this._carritoService.añadirProducto(cell);

      //Conseguir productos del carrito
      this.carrito = this._carritoService.getProducto();
      console.log(this.carrito);
      document.getElementById('carrito').innerHTML =
        "<span class=\"fa fa-cart-plus fa-1x \" aria-hidden=\"true\"></span>"+this.carrito.length;
      document.getElementById(cell.id).innerHTML = "<div style='position: absolute; z-index: 100; ' class=\"alert alert-success alert-dismissable\">\n" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n" +
        "   <i class=\"fa fa-check\" aria-hidden=\"true\"></i> <strong>&nbsp Añadido al carrito &nbsp &nbsp</strong>" +
        "</div>";
        swal({
          title: 'Añadido al carrito',
          text: cell.marca + cell.modelo,
          html: '<p>'+cell.marca + cell.modelo+'</p>',
          imageUrl: cell.imagen,
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
    else{
      this._router.navigate(['/producto', cell.id, cell.modelo]);
      window.scrollTo(0,0);
    }

  }

  detalles(){
    window.scrollTo(0,0);
  }

}

