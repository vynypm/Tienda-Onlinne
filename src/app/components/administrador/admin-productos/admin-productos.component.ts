import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../interfaces/producto.interface';
import {ProductoService} from '../../../services/producto.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  listaProductos: Producto [] = [];

  constructor(private _usuarioServices: UsuarioService, private _productoServices: ProductoService, private _router: Router) {
    this._productoServices.consultarProductos()
      .subscribe(
        respuesta => {
          //console.log(respuesta);
          for (let key$ in respuesta ) {
            //console.log(respuesta[key$]);
            let productoNew = respuesta[key$];
            productoNew.id = respuesta[key$].id;
            //console.log(productoNew.id);
            //console.log(respuesta[key$].id);
            this.listaProductos.push(productoNew);

          }
          console.log(this.listaProductos);
          return this.listaProductos;
        }
      );

    console.log(this.listaProductos);
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
          console.log('se eliminó');
          this.listaProductos.splice(posicion, 1);
        }
      );
  }
}
