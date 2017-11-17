import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoService } from '../../../services/logo.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  facebook: boolean = false;
  youtube: boolean = false;
  twitter: boolean = false;
  lengthLogo: number = 0;
  habilitarBoton: boolean = true;
  id: string;
  logo: any = {
    imgLogo: null,
    linkFacebook: null,
    linkYoutube: null,
    linkTwitter: null
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
            this.lengthLogo = resultado.length;

            this.ngOnInit();
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
        this.logo.linkFacebook = null;
      }
      if (this.youtube === false) {
        this.logo.linkYoutube = null;
      }
      if (this.twitter === false) {
        this.logo.linkTwitter = null;
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