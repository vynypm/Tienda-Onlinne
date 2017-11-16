import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../interfaces/cliente.interface';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'cliente',
    telefono: 0,
    movil: 0,
    pedido: '',
  }

  constructor(private _clienteService: ClienteService, private _router: Router,  private _carritoService: CarritoService) { }

  ngOnInit() {
  }
  registrar() {
    console.log(this.cliente);
    this._clienteService.nuevoCliente(this.cliente).subscribe(
      resp => {
        console.log(resp);
        if (typeof(Storage) !== 'undefined') {
          sessionStorage.setItem('Cliente', this.cliente.email);
        }

        var cesta = this._carritoService.getProducto();
        if (cesta.length != 0){
            this._router.navigate(['/carrito']);
        }else{
            this._router.navigate(['/home']);
        }
      },
      error => {
        console.log("Email ya existe");
      });
  }

}
