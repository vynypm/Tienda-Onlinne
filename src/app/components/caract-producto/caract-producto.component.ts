import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-caract-producto',
  templateUrl: './caract-producto.component.html',
  styleUrls: ['./caract-producto.component.css']
})
export class CaractProductoComponent implements OnInit {

  allImages: any = {
    url:""
  };

  catSimilar = null;

  prodCategoria: any [] = [];

  producto: any = {
    marca: "",
    modelo: "",
    precio: 0,
    descripcion: "",
    imagen: "",
    categoria: "",
    promocion: false,
    precio_promo: 0,
  }

  constructor(private _activatedRoute: ActivatedRoute,
              private _productoService: ProductoService) {
    this._activatedRoute.params.subscribe(
      parametros => {
        this._productoService.getProducto(parametros['id']).subscribe(
          resultado => {

            this.allImages.url = resultado.imagen;

            let marca, imagen, categoria;
            marca = resultado.marca;
            imagen = resultado.imagen;
            categoria = resultado.categoria;
            this.producto = resultado;
            this.producto.marca = marca.nombre;
            this.producto.imagen = imagen[0];
            this.catSimilar = categoria.nombre;
            //console.log(this.producto.imagen);
            this.mismaCategoria();
          }
        );
      }
    );

  }

  ngOnInit() {

  }

  mismaCategoria() {
    this.prodCategoria = [];
    this._productoService.consultarProductos()
      .subscribe(
        resultado => {
          for (let key in resultado) {

            let marca, imagen, categoria ;

            marca = resultado[key].marca;
            imagen = resultado[key].imagen;
            categoria = resultado[key].categoria;

            let productoNew = resultado[key];
            productoNew.marca = marca.nombre;
            productoNew.imagen = imagen[0];
            productoNew.categoria = categoria.nombre;

            if (productoNew.categoria === this.catSimilar ) {
              this.prodCategoria.push(productoNew);
            }
          }
        }
      );
  }

  cambiarImg(img: string) {
    //console.log(img);
    this.producto.imagen = img;
  }


}
