import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto.interface';
import {ProductoService} from '../../services/producto.service';
import {PaginationService} from '../../services/pagination.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
  listaLaptops: Producto [] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];

  constructor(private _productoServices: ProductoService, private _paginationService: PaginationService) {
    this._productoServices.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {
            let marca, imagen, categoria ;
            marca = resultado[key].marca;
            imagen = resultado[key].imagen;
            categoria = resultado[key].categoria;

            let laptopNew = resultado[key];
            laptopNew.marca = marca.nombre;
            laptopNew.imagen = imagen[0];
            laptopNew.categoria = categoria.nombre;

            if (laptopNew.categoria === 'Laptop' ) {
              this.listaLaptops.push(laptopNew);
            }
          }
          this.setPage(1);

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
    this.pager = this._paginationService.getPager(this.listaLaptops.length, page);

    // get current page of items
    this.pagedItems = this.listaLaptops.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
