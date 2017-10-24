import { Component, OnInit } from '@angular/core';
import { NavbarSistemaComponent } from '../navbar-sistema/navbar-sistema.component';

import {Producto} from '../../../interfaces/registro.interface';
import {ProductoService} from '../../../services/producto.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  id: string;
  listaCategorias: any [] = [];
  producto: Producto = {
    marca: "",
    modelo: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    categoria: "",
  }

  constructor(private _usuarioServices: UsuarioService, private _productoServices: ProductoService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    console.log("registro controlador");
      this._productoServices.consultarCategoria()
        .subscribe(
          respuesta => {
            console.log(respuesta);
            for (let key$ in respuesta ) {
              //console.log(respuesta[key$]);
              let categoriaNew = respuesta[key$];
              categoriaNew.id = respuesta[key$].id;
              this.listaCategorias.push(categoriaNew);

            }
            //console.log(this.listaCategorias);
            return this.listaCategorias;
          }
        );
      console.log(this.listaCategorias);

      this._activatedRoute.params.subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._productoServices.getProducto(this.id).subscribe(
              resultado => {
                this.producto = resultado;
              }
            );
          }
        }
      );
  }

  ngOnInit() {
    console.log("registro ngOnInit");
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    })
  }

  guardar() {
    //console.log(this.producto);
    /*this._productoServices.nuevoProducto(this.producto)
      .subscribe(
        resultado => {
          console.log(resultado);
          //this._router.navigate(['/manga', resultado.name ]);
        }
      );
*/
    if (this.id == 'nuevo') {
      // guardar pokemon nuevo
      this._productoServices.nuevoProducto(this.producto).subscribe(
        resultado => {
          console.log(resultado.name);
          this._router.navigate(['/menu']);
        }
      );
    }else {
      this._productoServices.editarProducto(this.producto, this.id).subscribe(
        resultado => {
          this._router.navigate(['/menu' ]);
        }
      );
    }
  }
}
