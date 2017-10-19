import { Component, OnInit } from '@angular/core';
import { UsuarioFooter } from '../../../interfaces/usuario.footer.interface';
import { UsuarioFooterService } from '../../../services/usuario.footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  habilitado: boolean = true;
  usuario: UsuarioFooter= {
    nombre: null,
    apellido: null,
    mensaje: null,
    correo: null
  }

  constructor(private _usuarioFooterService: UsuarioFooterService) { }

  ngOnInit() {
  }

  guardar(forma: any ) {

    console.log(this.usuario);
    console.log(this.habilitado);
    this.habilitado = false;
    this._usuarioFooterService.nuevoUsuario(this.usuario).subscribe(
      data => {
        console.log(data);
        this.habilitado = true;
      },
      error => {
        console.log(error);
      },
    )
  }

}
