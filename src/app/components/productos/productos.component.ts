import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { PaginationService } from '../../services/pagination.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaCategorias: any[] = [];
  filtroCategoria: string = 'Celular';
  listaProductos: Producto [] = [];
  carrito:any [] = [];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];
  constructor(private _categoriaService: CategoriaService,
              private _productoServices: ProductoService,
              private _paginationService: PaginationService,
              private _carritoService: CarritoService) {

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

            if (productoNew.categoria === this.filtroCategoria ) {
              this.listaProductos.push(productoNew);
            }
          }
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
    cell.cantidad = 1;
    cell.subtotal = cell.cantidad * cell.precio_promo;
    console.log("Boton añadir");
    this._carritoService.añadirProducto(cell);

    //Conseguir productos del carrito
    this.carrito = this._carritoService.getProducto();
    console.log(this.carrito);
    document.getElementById('carrito').innerHTML =
      "<span class=\"fa fa-cart-plus fa-1x fa-inverse\" aria-hidden=\"true\"></span>"+this.carrito.length;
  }

}

