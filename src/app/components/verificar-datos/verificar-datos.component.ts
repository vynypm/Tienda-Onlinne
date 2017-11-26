import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../services/cliente.service';
import {Cliente} from '../../interfaces/cliente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-datos',
  templateUrl: './verificar-datos.component.html',
  styleUrls: ['./verificar-datos.component.css']
})
export class VerificarDatosComponent implements OnInit {
  pedido: any;
  verificacioncliente: any[] = [];
  hide: boolean = false;
  id: string;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'cliente',
    telefono: 0,
    movil: 0,
    pedido: '',
    callePrincipal: '',
    calleSecundaria: '',
    numCasa: '',
    ciudad: '',
    provincia: '',
  }
  check: boolean = false;
  constructor( private _clienteServices: ClienteService, private _router: Router) { }

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
            this.id = clientenew.id;
          }
        }
      }
    )
    //this.id = this.verificacioncliente.id;

  }

  verificar(){
    this.cliente.nombre = this.verificacioncliente[0].nombre;
    this.cliente.apellido = this.verificacioncliente[0].apellido;
    this.cliente.email = this.verificacioncliente[0].email;
    this.cliente.password = this.verificacioncliente[0].password;
    this.cliente.rol = this.verificacioncliente[0].rol;
    this.cliente.telefono = this.verificacioncliente[0].telefono;
    this.cliente.movil = this.verificacioncliente[0].movil;
    this.cliente.pedido = this.verificacioncliente[0].pedido;
    this.cliente.callePrincipal = this.verificacioncliente[0].callePrincipal;
    this.cliente.calleSecundaria = this.verificacioncliente[0].calleSecundaria;
    this.cliente.numCasa = this.verificacioncliente[0].numCasa;
    this.cliente.provincia = this.verificacioncliente[0].provincia;
    this.cliente.ciudad = this.verificacioncliente[0].ciudad;
    console.log(this.id);
    console.log(this.cliente);
    this._clienteServices.editarCliente(this.cliente, this.id).subscribe(
      resultado => {
        console.log("Registro editado con exito");
        //this.habilitarBoton = true;
        this._router.navigate(['/informacionfinal']);
      }
    );
  }

}
