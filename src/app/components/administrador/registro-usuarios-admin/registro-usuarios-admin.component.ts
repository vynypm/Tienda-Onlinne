import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registro-usuarios-admin',
  templateUrl: './registro-usuarios-admin.component.html',
  styleUrls: ['./registro-usuarios-admin.component.css']
})
export class RegistroUsuariosAdminComponent implements OnInit {

  id: string;

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password1: '',
    rol: '',
    telefono: '',
    img: '',
  };



  constructor(private _usuarioService: UsuarioService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {


    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id !== 'nuevo') {
          this._usuarioService.getUsuario(this.id).subscribe(
            resultado => {
              this.usuario = resultado;
            }
          );
        }
      }
    );

  }

  ngOnInit() {
    this._usuarioService.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    })
  }

  guardar() {

    if (this.id == 'nuevo') {

      if (this.usuario.password == this.usuario.password1) {
        this._usuarioService.nuevoUsuario(this.usuario).subscribe(
          resp => {
            console.log(resp);
            this._router.navigate(['/usuarios']);
          });
      } else {
        console.log('las contraseñas no coiciden');
      }

    } else {

      this._usuarioService.editarUsuario(this.usuario, this.id).subscribe(
        resultado => {
          this._router.navigate(['/usuarios']);
        }
      );
    }

  }
}

