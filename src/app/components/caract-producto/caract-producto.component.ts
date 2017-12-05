import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Pagination2Service } from '../../services/pagination2.service';

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
    precio_promo: 0,
    opciones: ""
  }
// pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];


  constructor(private _activatedRoute: ActivatedRoute,
              private _productoService: ProductoService,
              private _paginationService: Pagination2Service) {
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
  }

}
