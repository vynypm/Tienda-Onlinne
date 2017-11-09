import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private hide: boolean = true;

  constructor(private _router: Router, private _usuarioServices: UsuarioService) { }

  ngOnInit() {
    this._usuarioServices.isLogged_cliente().then((result:boolean)=>{
      console.log(result);
      if (!result) {
        console.log(result);
        this.hide = false;
      }
    });
  }

  salir() {
    sessionStorage.removeItem('Cliente');
    this._router.navigate(['/login']);
  }

}
