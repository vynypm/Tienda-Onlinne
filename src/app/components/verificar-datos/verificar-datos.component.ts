import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../services/cliente.service';
import {Cliente} from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-verificar-datos',
  templateUrl: './verificar-datos.component.html',
  styleUrls: ['./verificar-datos.component.css']
})
export class VerificarDatosComponent implements OnInit {
  pedido: any;
  verificacioncliente: any[] = [];
  hide: boolean = false;
  constructor( private _clienteServices: ClienteService) { }

  ngOnInit() {
    var pedidoSorage = JSON.parse(localStorage.pedido);
    this.pedido = pedidoSorage;
    console.log(this.pedido.email);

    this._clienteServices.consultarCliente().subscribe(
      respuesta => {
        for (let key in respuesta){
          let clientenew = respuesta[key];
          if (clientenew.email === this.pedido.email){
            this.verificacioncliente.push(clientenew);
          }
        }
      }
    )
    console.log(this.verificacioncliente);
  }

  registrar(){

  }

}
