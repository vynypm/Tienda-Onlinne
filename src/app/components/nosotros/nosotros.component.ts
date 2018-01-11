import { Component, OnInit } from '@angular/core';
import { LogoService } from '../../services/logo.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  lat = -0.174496;
  lng = -78.487168;
  zoom = 17;
  facebookUrl;
  youtubeUrl;
  twitterUrl;
  googleUrl;
  logo;

  constructor(private _logoService: LogoService) {
    this._logoService.consultarLogo()
      .subscribe(
        resultado => {
          let empresa = resultado;
          this.logo = empresa[0].imgLogo;
          if (empresa[0].linkFacebook !== "") {
            this.facebookUrl = empresa[0].linkFacebook;
          }

          if (empresa[0].linkYoutube !== "") {
            this.youtubeUrl = empresa[0].linkYoutube;
          }

          if (empresa[0].linkTwitter !== "") {
            this.twitterUrl = empresa[0].linkTwitter;
          }

          if (empresa[0].linkGoogle !== "") {
            this.googleUrl = empresa[0].linkGoogle;
          }
        }
      );

  }

  ngOnInit() {
  }

}
