import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: Usuario[]= [];

  constructor(private _usuarioService: UsuarioService,
              private _router: Router) {
    this._usuarioService.consultarUsuarios()
      .subscribe(
        respuesta => {

          for (let key$ in respuesta ) {
            let usuarioNew = respuesta[key$];
            usuarioNew.id = respuesta[key$].id;

            this.usuarios.push(usuarioNew);

          }
          console.log(this.usuarios);
          return this.usuarios;
        }
      );

    console.log(this.usuarios);
  }

  ngOnInit() {
    this._usuarioService.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    });
  }

  eliminar(id: string, posicion: number) {
    this._usuarioService.eliminarUsuario(id)
      .subscribe(
        resultado => {
          console.log('se eliminó');
          this.usuarios.splice(posicion, 1);
        }
      );
  }
}
