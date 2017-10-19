import { Component, OnInit } from '@angular/core';
import { NavbarSistemaComponent } from '../navbar-sistema/navbar-sistema.component';
import {UsuarioService} from '../../../services/usuario.service';
import {ProductoService} from '../../../services/producto.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Pedido } from '../../../interfaces/pedidos.interface';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[]= [];



  constructor(private _usuarioServices: UsuarioService,private _router: Router, private _productoServices: ProductoService) {



    this._productoServices.consultarPedidos()
      .subscribe(
        respuesta => {

          for (let key$ in respuesta ) {
            let pedidosNew = respuesta[key$];
            pedidosNew.id = respuesta[key$].id;

            this.pedidos.push(pedidosNew);

          }
          console.log(this.pedidos);
          return this.pedidos;
        }
      );

    console.log(this.pedidos);

  }




  ngOnInit() {
    console.log("registro ngOnInit");
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    })
  }

}
