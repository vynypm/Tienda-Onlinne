import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../interfaces/producto.interface';
import {ProductoService} from '../../../services/producto.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import { MarcaService } from '../../../services/marca.service';
import { CategoriaService} from '../../../services/categoria.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {
  id: string;
  listaCategorias: any [] = [];
  listaMarcas: any [] = [];

  producto: Producto = {
    marca: "",
    modelo: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    categoria: "",
  }


  constructor(private _usuarioServices: UsuarioService,
              private _productoServices: ProductoService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _marcaService: MarcaService,
              private _categoriaService: CategoriaService) {
    console.log("registro controlador");
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
  }


  ngOnInit() {
    console.log("registro ngOnInit");
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    })
  }

  guardar() {
    if (this.id == 'nuevo') {
      this._productoServices.nuevoProducto(this.producto).subscribe(
        resultado => {
          console.log(resultado.name);
          this._router.navigate(['/admin-productos']);
        }
      );
    }else {
      this._productoServices.editarProducto(this.producto, this.id).subscribe(
        resultado => {
          this._router.navigate(['/admin-productos' ]);
        }
      );
    }
  }
}

