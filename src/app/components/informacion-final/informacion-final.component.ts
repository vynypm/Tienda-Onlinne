import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {ClienteService} from '../../services/cliente.service';
import {Cliente} from '../../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
declare let paypal: any;

@Component({
  selector: 'app-informacion-final',
  templateUrl: './informacion-final.component.html',
  styleUrls: ['./informacion-final.component.css']
})
export class InformacionFinalComponent implements OnInit, AfterViewChecked {

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

  //Payment with paypal
  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: 'production',
    client: {
      sandbox: 'AYgOYFoyFC-jdzeYm1bHEtWpyoVHA_xAyVMgYw79E6rg2l51dkgl45imtGQ3C-kqKd8RbmvULQrwYqzQ',
      production: 'AXQZJ_jf0kUt40nbAgZoODs_JBZu1J4TQb5sEe3gIH36GCSyKJOzKDewQ4rjVOhyPWBlpi_UzWg6H1Wn'
    },
    commit: true,
    payment: (data, actions) => {
      console.log("funcion_1");
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: '0.01', currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {

    },

  };

  public ngAfterViewChecked(): void {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        console.log("funcion_2");
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
      console.log("funcion_3")
    });
  }

}
