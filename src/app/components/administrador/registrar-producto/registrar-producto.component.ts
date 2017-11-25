import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../interfaces/producto.interface';
import {ProductoService} from '../../../services/producto.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import { MarcaService } from '../../../services/marca.service';
import { OpcionService } from '../../../services/opcion.service';
import { CategoriaService} from '../../../services/categoria.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-4.x';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {
  id: string;
  habilitarBoton: boolean = true;
  listaCategorias: any [] = [];
  listaMarcas: any [] = [];
  listaOpciones: any [] = [];
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  listaImagenes: any [] = [];

  producto: any = {
    marca: "",
    modelo: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    categoria: "",
    promocion: false,
    precio_promo: 0,
    opciones:"",
    stock: 0,
  }


  constructor(private _usuarioServices: UsuarioService,
              private _productoServices: ProductoService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _marcaService: MarcaService,
              private _categoriaService: CategoriaService,
              private _opcionService: OpcionService, private cloudinary: Cloudinary) {
    //console.log("registro controlador");
    this._categoriaService.consultarCategorias()
      .subscribe(
        respuesta => {
          console.log(respuesta);
          for (let key$ in respuesta ) {
            //console.log(respuesta[key$]);
            let categoriaNew = respuesta[key$];
            categoriaNew.id = respuesta[key$].id;
            this.listaCategorias.push(categoriaNew);

          }
          //console.log(this.listaCategorias);
          return this.listaCategorias;
        }
      );
    console.log(this.listaCategorias);

    this._activatedRoute.params.subscribe(
      parametros => {
        this.id = parametros['id'];
        if (this.id !== 'nuevo') {
          this._productoServices.getProducto(this.id).subscribe(
            resultado => {
              this.producto = resultado;
              console.log(this.producto);
            }
          );
        }
      }
    );

    this._marcaService.consultarMarcas()
      .subscribe(
        resultado => {
          this.listaMarcas = resultado;
          //console.log(this.listaMarcas);
        }
      );
    this._opcionService.consultarOpciones()
      .subscribe(
        resultado => {
          this.listaOpciones = resultado;
          console.log(this.listaOpciones);
        }
      );
  }


  ngOnInit() {
    console.log(this.selected);
    console.log("registro ngOnInit");

    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    });

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      autoUpload: false, // Cargar archivos automáticamente al agregarlos a la cola de carga
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
      this.listaImagenes.push(fileItem.data.url);
    }

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
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
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(this.hasBaseDropZoneOver);
  }

  guardar() {
    this.habilitarBoton = false;
    this.producto.imagen = this.listaImagenes;
    //this.producto.opciones = this.selected;
    console.log(this.producto);
    if (this.id === 'nuevo') {
      console.log(this.producto);
      this._productoServices.nuevoProducto(this.producto).subscribe(
        resultado => {
          //console.log(resultado.name);
          this.habilitarBoton = true;
          this._router.navigate(['/admin-productos']);
        }
      );
    }else {
      this._productoServices.editarProducto(this.producto, this.id).subscribe(
        resultado => {
          this.habilitarBoton = true;
          this._router.navigate(['/admin-productos' ]);
        }
      );
    }
  }


  public selected:any[]=[];
  opciones(event, val){
    event.preventDefault();
    if(this.selected.indexOf(val.nombre) == -1){
      this.selected = [...this.selected, val.nombre];
      $("#" + val.id).toggleClass("fa fa-check");
      this.producto.opciones = this.selected;
    }else{
      $("#" + val.id).toggleClass("fa fa-check");
      this.selected = this.selected.filter(function(elem){
        return elem != val.nombre;
      });
      this.producto.opciones = this.selected;
    }
  }



}

