import { Component, OnInit,AfterViewInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit, AfterViewInit, OnDestroy {
  pedidos: any[] = [];
  public timerInterval:any;
  constructor(public _pedidoService: PedidoService) {
    this._pedidoService.consultarPedido().subscribe(
      respuesta => {
         this.pedidos = respuesta;
        console.log(this.pedidos);
      }
    );
  }

  ngAfterViewInit(){
    this.timerInterval = setInterval(()=>{
      //console.log("setInterval saludo");
      this._pedidoService.consultarPedido().subscribe(
        respuesta => {
          this.pedidos = respuesta;
          console.log(this.pedidos);
        }
      );
    }, 3000);
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.timerInterval);
  }

  ngOnInit() {
  }

}
