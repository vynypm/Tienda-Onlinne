import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { SailsService } from 'angular2-sails';
declare var io: any;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {

  pedidosSolicitados: any[] = [];
  pedidosAprobados: any[] = [];
  public timerInterval: any;
  zone: any;
  listarPedidos: any[] = [];

  constructor(public _pedidoService: PedidoService, private _sailsService: SailsService) {
    io.sails.url="https://store-onlinne.herokuapp.com/";
    /*io.socket.get("http://localhost:1337/pedidos",function (resData){
      console.log(resData);
    });*/
    //this._sailsService.connect("https://store-onlinne.herokuapp.com");

    io.socket.on('pedidos',(objeto)=>{
      console.log("SOcket On");
      console.log(objeto);
      if(objeto.verb === 'created'){
        this.actualizarPedidos();
      }

    });

    this.zone = new NgZone({enableLongStackTrace: false});
  }

  ngOnInit() {
    this.pedidosSolicitados = [];
    this.pedidosAprobados = [];
    this._pedidoService.consultarPedido().subscribe(
      respuesta => {
        for( let key in respuesta){
          var newPedido = respuesta[key];
          if ( newPedido.estado === "solicitado"){
            this.pedidosSolicitados.push(newPedido);
          }
          else {
            if (newPedido.estado === "aprobado"){
              this.pedidosAprobados.push(newPedido);
            }
          }
        }
        console.log(this.pedidosSolicitados);
        console.log(this.pedidosAprobados);
      }
    );

  }

  actualizarPedidos(){
    console.log("actualizar");
    this.zone.run(()=>{
      //this.pedidos.push(nuevoPedido);
      this._pedidoService.consultarPedido().subscribe(
        respuesta => {
          for( let key in respuesta){
            var newPedido = respuesta[key];
            if ( newPedido.estado === "solicitado"){
              this.pedidosSolicitados.push(newPedido);
            }
            else {
              if (newPedido.estado === "aprobado"){
                this.pedidosAprobados.push(newPedido);
              }
            }
          }
          console.log(this.pedidosSolicitados);
          console.log(this.pedidosAprobados);
        }
      );

    });
  }

  aprobar(p){
    var indice;
    for ( let key in this.pedidosSolicitados){
      if (this.pedidosSolicitados[key] === p){
        indice = key;
      }
    }
    this.pedidosSolicitados.splice(indice,1);

    p.estado = "aprobado";
    this._pedidoService.editarProducto(p, p.id).subscribe(
      resultado => {
        console.log("Pedido aprobado");
      }
    );
  }

  solicitar(p){
    var indice;
    for ( let key in this.pedidosAprobados){
      if (this.pedidosAprobados[key] === p){
        indice = key;
      }
    }
    this.pedidosAprobados.splice(indice,1);

    p.estado = "solicitado";
    this._pedidoService.editarProducto(p, p.id).subscribe(
      resultado => {
        console.log("Pedido cambiado a solicitado");
      }
    );
  }

}
