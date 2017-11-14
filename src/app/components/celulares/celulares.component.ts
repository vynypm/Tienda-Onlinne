import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto.interface';
import {ProductoService} from '../../services/producto.service';
import {PaginationService} from '../../services/pagination.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css']
})
export class CelularesComponent implements OnInit {

  listaCelulares: Producto [] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];

  constructor(private _productoServices: ProductoService, private _paginationService: PaginationService,
              private _carritoService: CarritoService) {
    this._productoServices.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {
            let marca, imagen, categoria ;
            marca = resultado[key].marca;
            imagen = resultado[key].imagen;
            categoria = resultado[key].categoria;
            let celularNew = resultado[key];
            celularNew.marca = marca.nombre;
            celularNew.imagen = imagen[0];
            celularNew.categoria = categoria.nombre;
            //console.log(imagen);
            //this.listaCelulares.push(celularNew);
            if (celularNew.categoria === 'Celular' ) {
              this.listaCelulares.push(celularNew);
            }
          }
          this.setPage(1);
          //this.listaCelulares = resultado;
          //console.log(resultado[0].marca);
          //console.log(this.listaCelulares);
        }
      );
  }

  ngOnInit() {
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._paginationService.getPager(this.listaCelulares.length, page);

    // get current page of items
    this.pagedItems = this.listaCelulares.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  anadir(cell){
    cell.cantidad = 1;
    console.log("Boton añadir");
    this._carritoService.añadirProducto(cell);
  }

}
