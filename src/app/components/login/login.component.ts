import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Usuario} from '../../interfaces/usuario.interface';
import {UsuarioService} from '../../services/usuario.service';

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

  constructor(private _router: Router, private _usuarioServices: UsuarioService) { }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (result) {
        this._router.navigate(['/admin-productos']);
      }
    })
  }

  login(email, password){
    console.log("email:" + email);
    console.log("password:" + password);
    this._usuarioServices.consultarUsuarios().subscribe(
      respuesta => {
        //console.log(respuesta);
        for (let key$ in respuesta ) {
          //console.log(respuesta[key$]);
          let usuarioNew = respuesta[key$];
          usuarioNew.id = respuesta[key$].id;
          //console.log(usuarioNew.id);
          //console.log(respuesta[key$].id);
          this.listaUsuario.push(usuarioNew);
          if (usuarioNew.email === email && usuarioNew.password === password && (usuarioNew.rol === "Administrador" ||  usuarioNew.rol === "Tecnico") ){
            if (typeof(Storage) !== 'undefined') {
              sessionStorage.setItem('Usuario', this.usuario.email)
            }
            console.log("Email correcto");
            console.log(usuarioNew);
            this._router.navigate(['/admin-productos']);
          }else{
            console.log("Email incorrectocorrecto");
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'ERROR DE AUTENTICACIÓN: ', detail:'Por favor ingrese correctamente su email y contraseña'});
          }

        }
        //console.log(this.listaUsuario);
        return this.listaUsuario;
      });

    //console.log(this.listaUsuario);


  }



}
