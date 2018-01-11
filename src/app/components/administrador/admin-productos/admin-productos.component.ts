import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../interfaces/producto.interface';
import {ProductoService} from '../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import { CategoriaService } from '../../../services/categoria.service';
import { PaginationAdminService } from '../../../services/pagination-admin.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  listaProductos: Producto [] = [];
  listaCategorias: any[] = [];
  filtroCategoria: string = null;

  pager: any = {}; // pager object
  pagedItems: any[] = []; // paged items
  nombreCategoria: any;

  constructor(private _activatedRoute: ActivatedRoute, private _usuarioServices: UsuarioService,
              private _productoServices: ProductoService,
              private _router: Router,
              private _categoriaService: CategoriaService, private _paginationService: PaginationAdminService) {

    //Recivo el nombre que me envia por el route
    this._activatedRoute.params.subscribe(
      parametros => {
        this.nombreCategoria = parametros.nombre;
        this.consultaProductos();
      }
    );

    this._categoriaService.consultarCategorias()
      .subscribe(
        resultado => {
          this.listaCategorias = resultado;
          console.log(this.listaCategorias);
        }
      );

  }

  ngOnInit() {
    console.log("registro ngOnInit");
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    });
  }

  eliminar(id: string, posicion: number) {
    this._productoServices.eliminarProducto(id)
      .subscribe(
        resultado => {
          //console.log('se eliminó');
          this.listaProductos.splice(posicion, 1);
        }
      );
  }

  consultaProductos() {
    this._productoServices.consultarProductos()
      .subscribe(
        respuesta => {
          this.listaProductos = [];
          if (this.nombreCategoria === "todos") {
            for (let key$ in respuesta ) {

              let marca, imagen, categoria;
              marca = respuesta[key$].marca;
              imagen = respuesta[key$].imagen;
              categoria = respuesta[key$].categoria;

              let productoNew = respuesta[key$];
              productoNew.id = respuesta[key$].id;
              productoNew.marca = marca.nombre;
              productoNew.imagen = imagen[0];
              productoNew.categoria = categoria.nombre;
              this.listaProductos.push(productoNew);
            }
            this.setPage(1);
          } else {
            for (let key$ in respuesta ) {

              let marca, imagen, categoria;
              marca = respuesta[key$].marca;
              imagen = respuesta[key$].imagen;
              categoria = respuesta[key$].categoria;

              let productoNew = respuesta[key$];
              productoNew.id = respuesta[key$].id;
              productoNew.marca = marca.nombre;
              productoNew.imagen = imagen[0];
              productoNew.categoria = categoria.nombre;
              if (productoNew.categoria === this.nombreCategoria) {
                this.listaProductos.push(productoNew);
                this.setPage(1);
              }
            }
          }
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
    console.log(this.pagedItems);
  }
}
