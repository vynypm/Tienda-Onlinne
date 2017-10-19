import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarSistemaComponent } from '../navbar-sistema/navbar-sistema.component';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../interfaces/usuario.interface';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  listaUsuario: Usuario [] = [];
  email: string;
  user: Usuario[] =[]
  constructor(private _router: Router, private _usuarioServices: UsuarioService, private _route: ActivatedRoute) { 
  	
  	this._usuarioServices.consultarUsuarios().subscribe(
        respuesta => {
          for (let key$ in respuesta ) {
            let usuarioNew = respuesta[key$];
            usuarioNew.id = respuesta[key$].id;
            //console.log(usuarioNew.id);
            //console.log(respuesta[key$].id);
            this.listaUsuario.push(usuarioNew);
            if (usuarioNew.email === this.email){
            	//console.log(usuarioNew);
            	 this.user.push(usuarioNew);
            }

          }
          //console.log(this.listaUsuario);
          return this.listaUsuario;
	    });
  		//console.log(this.user);
    	//console.log(this.listaUsuario);
  }

  ngOnInit() {
  	this.email = sessionStorage.getItem('Usuario');
  	console.log(this.email);

  	this._usuarioServices.isLogged().then((result:boolean)=>{

		if (!result) {
			this._router.navigate(['/login']);
		}
	})
  }


}
