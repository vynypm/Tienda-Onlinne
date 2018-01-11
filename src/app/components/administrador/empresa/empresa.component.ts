import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoService } from '../../../services/logo.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-4.x';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  facebook: boolean = false;
  youtube: boolean = false;
  twitter: boolean = false;
  google: boolean = false;
  lengthLogo: number = 0;
  habilitarBoton: boolean = true;
  id: string;
  logo: any = {
    nombre: "",
    imgLogo: "",
    imgCarousel: [],
    linkFacebook: "",
    linkYoutube: "",
    linkTwitter: "",
    linkGoogle: ""
  };
  public uploader: FileUploader;
  public uploaderCarrusel: FileUploader;
  public hasBaseDropZoneOver = false;
  imgcarrusel: any[]=[];
  imgLogo: any;

  constructor(private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService,
              private _logoService: LogoService,
              private cloudinary: Cloudinary) {
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

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      autoUpload: true, // Cargar archivos automáticamente al agregarlos a la cola de carga
      isHTML5: true, // Use xhrTransport a favor de iframeTransport
      removeAfterUpload: true, // Calcule el progreso de forma independiente para cada archivo cargado
      headers: [ // XHR request headers
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    const upsertResponse = fileItem => {
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        console.log('Upload to cloudinary Failed');
        console.log(fileItem);
        return false;
      }
      console.log(fileItem.data.url);
      this.logo.imgLogo = fileItem.data.url;
    }

    const upsertResponseCarrusel = fileItem => {
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        console.log('Upload to cloudinary Failed');
        console.log(fileItem);
        return false;
      }
      console.log(fileItem.data.url);
      this.imgcarrusel.push(fileItem.data.url);
      console.log(this.imgcarrusel);
    }

    this.uploader = new FileUploader(uploaderOptions);
    this.uploaderCarrusel = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Agregue el preajuste de carga sin firmar de Cloudinary al formulario de carga
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Usar el valor predeterminado "withCredentials" para las solicitudes CORS
      fileItem.withCredentials = false;
      return { fileItem, form };
    }

    this.uploaderCarrusel.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Agregue el preajuste de carga sin firmar de Cloudinary al formulario de carga
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Usar el valor predeterminado "withCredentials" para las solicitudes CORS
      fileItem.withCredentials = false;
      return { fileItem, form };
    }

    // Actualizar el modelo al finalizar la carga de un archivo
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file, status,
          data: JSON.parse(response),
        }
      );

    this.uploaderCarrusel.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponseCarrusel(
        {
          file: item.file, status,
          data: JSON.parse(response),
        }
      );
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
              console.log(this.logo);
              this.imgcarrusel = this.logo.imgCarousel;
              this.imgLogo = this.logo.imgLogo;
            }
          );
      }
    }
  }

  guardar() {
    this.habilitarBoton = false;
    this.logo.imgCarousel = this.imgcarrusel;
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
            this._router.navigate(['/admin-productos', 'todos' ]);
          }
        );
    }
  }

  eliminarImg(img){
    var pos = this.imgcarrusel.indexOf(img);
    console.log(pos);
    this.imgcarrusel.splice(pos, 1);
  }

  eliminarLogo(img){
    var pos = this.imgLogo.indexOf(img);
    console.log(pos);
    this.imgLogo.splice(pos, 1);
  }
}
