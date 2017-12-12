import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Usuario} from '../../interfaces/usuario.interface';
import {UsuarioService} from '../../services/usuario.service';
import {ClienteService} from '../../services/cliente.service';
//import {MessagesModule} from 'primeng/primeng';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: any[] = [];

  usuario: Usuario = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password1: "",
    rol: "",
    telefono: "",
    img: "",
  }
  listaUsuario: Usuario [] = [];

  constructor(private _router: Router, private _usuarioServices: UsuarioService, private _clienteServices: ClienteService,
              private _carritoService: CarritoService) { }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (result) {
        this._router.navigate(['/admin-productos']);
      }
    });
    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      if (result) {
        this._router.navigate(['/celulares']);
      }
    })
  }

  login(email, password) {
    console.log("email:" + email);
    console.log("password:" + password);
    //Login si es Administrador
    this._usuarioServices.consultarUsuarios().subscribe(
      respuesta => {
        for (let key$ in respuesta ) {
          let usuarioNew = respuesta[key$];
          usuarioNew.id = respuesta[key$].id;
          this.listaUsuario.push(usuarioNew);
          if (usuarioNew.email === email && usuarioNew.password === password &&
            (usuarioNew.rol === "Administrador" ||  usuarioNew.rol === "Tecnico") ) {
                if (typeof(Storage) !== 'undefined') {
                  sessionStorage.setItem('Usuario', this.usuario.email);
                }
                console.log("Email correcto");
                console.log(usuarioNew);
                this._router.navigate(['/admin-productos']);
          }else {
                console.log("Email incorrectocorrecto");
          }

        }
        //console.log(this.listaUsuario);
        return this.listaUsuario;
      });

    //Login si es Cliente
    this._clienteServices.consultarCliente().subscribe(
      respuesta => {
        for (let key$ in respuesta ) {
          let usuarioNew = respuesta[key$];
          usuarioNew.id = respuesta[key$].id;
          //this.listaUsuario.push(usuarioNew);
          if (usuarioNew.email === email && usuarioNew.password === password &&
            (usuarioNew.rol === "cliente") ) {
                if (typeof(Storage) !== 'undefined') {
                  sessionStorage.setItem('Cliente', this.usuario.email);
                }
                console.log("Email correcto");
                console.log(usuarioNew);

                var cesta = this._carritoService.getProducto();
                if (cesta.length != 0){
                    this._router.navigate(['/carrito']);
                }else{
                  this._router.navigate(['/home']);
                }
          }else {
                console.log("Email incorrectocorrecto");
              document.getElementById('sms').innerHTML = "<div style='position: absolute; z-index: 100; ' class=\"alert alert-danger\">\n" +
                "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n" +
                "   <i class=\"fa fa-times\" aria-hidden=\"true\"></i> <strong>&nbsp Ingrese correctamente su email y contraseña &nbsp &nbsp</strong>" +
                "</div>";

          }
        }
        //console.log(this.listaUsuario);
        return this.listaUsuario;
      });

  }



}
