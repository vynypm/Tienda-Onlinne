import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoService } from '../../../services/logo.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  facebook: boolean = false;
  youtube: boolean = false;
  twitter: boolean = false;
  lengthLogo: number = 0;
  habilitarBoton: boolean = true;
  id: string;
  logo: any = {
    nombre: "",
    imgLogo: "",
    imgCarousel: "",
    linkFacebook: "",
    linkYoutube: "",
    linkTwitter: ""
  };

  constructor(private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService,
              private _logoService: LogoService) {
    this._logoService.consultarLogo()
      .subscribe(
        resultado => {
          for (let key in resultado ) {
            this.id = resultado[key].id;
            console.log(this.id);
            this.lengthLogo = resultado.length;

            this.consultaLogo();
          }
        }
      );

  }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result: boolean) => {
      if (!result) {
        this._router.navigate(['/login']);
      }
    });
  }

  consultaLogo() {
    let estadopagina = document.readyState;
    console.log(estadopagina);
    if (estadopagina === "complete") {
      if (this.lengthLogo !== 0) {
        this._logoService.getLogo(this.id)
          .subscribe(
            resultado => {
              this.logo = resultado;
            }
          );
      }
    }
  }

  guardar() {
    this.habilitarBoton = false;
    if (this.lengthLogo !== 0) {
      //MODIFICAR
      this._logoService.editarLogo(this.logo, this.id)
        .subscribe(
          resultado => {
            this.habilitarBoton = true;
            //console.log(resultado);
            this._router.navigate(['/admin-productos' ]);
          }
        );
    }else {
      if (this.facebook === false) {
        this.logo.linkFacebook = "";
      }
      if (this.youtube === false) {
        this.logo.linkYoutube = "";
      }
      if (this.twitter === false) {
        this.logo.linkTwitter = "";
      }
      //GUARDAR NUEVO
      this._logoService.nuevoLogo(this.logo)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this.habilitarBoton = true;
            this._router.navigate(['/admin-productos' ]);
          }
        );
    }
  }
}
