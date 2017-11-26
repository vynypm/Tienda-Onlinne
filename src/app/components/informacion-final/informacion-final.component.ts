import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../services/cliente.service';
import {Cliente} from '../../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-informacion-final',
  templateUrl: './informacion-final.component.html',
  styleUrls: ['./informacion-final.component.css']
})
export class InformacionFinalComponent implements OnInit {

  informacion:Cliente[]=[];
  pedido: any;
  id: string;
  constructor(private _clienteServices: ClienteService, private _router: Router, private _pedidoServices: PedidoService) { }

  ngOnInit() {
    var pedidoSorage = JSON.parse(localStorage.pedido);
    this.pedido = pedidoSorage;
    console.log(this.pedido);

    this._clienteServices.consultarCliente().subscribe(
      respuesta => {
        for (let key in respuesta){
          let clientenew = respuesta[key];
          if (clientenew.email === this.pedido.email){
            this.informacion.push(clientenew);
            this.id = clientenew.id;
          }
        }
      }
    )
    console.log(this.informacion);
  }

  comprar(){
    this.pedido.email = this.id;
    console.log(this.pedido);
    this._pedidoServices.nuevoPedido(this.pedido).subscribe(
      resultado =>{
        console.log(resultado);
        console.log("Compra realizada con exito");
      }
    );
  }

}
