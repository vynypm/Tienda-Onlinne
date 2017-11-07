import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../interfaces/cliente.interface';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';

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

  constructor(private _clienteService: ClienteService, private _router: Router) { }

  ngOnInit() {
  }
  registrar() {
    console.log(this.cliente);
    this._clienteService.nuevoCliente(this.cliente).subscribe(
      resp => {
        console.log(resp);
        this._router.navigate(['/login']);
      });
  }

}
