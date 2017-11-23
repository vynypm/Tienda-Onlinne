import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../interfaces/producto.interface';
import {ProductoService} from '../../../services/producto.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  listaProductos: Producto [] = [];
  listaCategorias: any[] = [];
  filtroCategoria: string = null;

  constructor(private _usuarioServices: UsuarioService,
              private _productoServices: ProductoService,
              private _router: Router,
              private _categoriaService: CategoriaService) {

    this._categoriaService.consultarCategorias()
      .subscribe(
        resultado => {
          this.listaCategorias = resultado;
          console.log(this.listaCategorias);
        }
      );

    this.consultaProductos();
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
          //console.log(respuesta);
          for (let key$ in respuesta ) {
            //console.log(respuesta[key$]);
            let marca, imagen, categoria ;
            marca = respuesta[key$].marca;
            imagen = respuesta[key$].imagen;
            categoria = respuesta[key$].categoria;

            let productoNew = respuesta[key$];
            productoNew.id = respuesta[key$].id;
            productoNew.marca = marca.nombre;
            productoNew.imagen = imagen[0];
            productoNew.categoria = categoria.nombre;
            //console.log(productoNew.id);
            //console.log(respuesta[key$].id);

            if (this.filtroCategoria === null ) {
              this.listaProductos.push(productoNew);
            }else if (productoNew.categoria === this.filtroCategoria) {
              this.listaProductos.push(productoNew);
            }

            //this.listaProductos.push(productoNew);
            //console.log(this.listaProductos);

          }
          //console.log(this.listaProductos);
          return this.listaProductos;
        }
      );
  }

  filtrarCategoria(nombre) {
    //console.log("Filtrar Categoria");
    this.filtroCategoria = nombre;
    //console.log(this.filtroCategoria);
    this.listaProductos = [];
    this.consultaProductos();
  }
}
