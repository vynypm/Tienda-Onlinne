import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario.interface';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styles: []
})
export class AdministracionComponent implements OnInit {

  usuarios: Usuario[]= [];

  constructor(private _usuarioService: UsuarioService) {
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
