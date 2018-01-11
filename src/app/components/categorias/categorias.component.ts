import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { CarritoService } from '../../services/carrito.service';
import { PaginationService } from '../../services/pagination.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  filtroProducto: Producto[] = [];
  listaCategorias: any[] = [];
  carrito:any [] = [];
  pager: any = {}; // pager object
  pagedItems: any[] = []; // paged items
  nombreCategoria: any;
  habilitar: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _carritoService: CarritoService,
              private _productoServices: ProductoService, private _categoriaService: CategoriaService,
              private _paginationService: PaginationService) {
      //Recivo el nombre que me envia por el route
      this._activatedRoute.params.subscribe(
          parametros=> {
              this.nombreCategoria = parametros.nombre;
              this.productosFiltrados();
          }
      );

      //Consulto todas las categorias
      this._categoriaService.consultarCategorias().subscribe(
          resultado => {
            this.listaCategorias = resultado;
            console.log(this.listaCategorias);
          }
      );
      console.log(this.listaCategorias);

  }

  ngOnInit() {

  }

  productosFiltrados(){
    //Filtro todos los productos según la categoría
    this._productoServices.consultarProductos().subscribe(
      result => {
        //console.log(result);
        this.filtroProducto = [];
        if (this.nombreCategoria === "todos"){
          for ( let key in result){
            let marca, imagen, categoria ;
            marca = result[key].marca;
            imagen = result[key].imagen;
            categoria = result[key].categoria;

            var newProducto = result[key];
            newProducto.marca = marca.nombre;
            newProducto.imagen = imagen[0];
            newProducto.categoria = categoria.nombre;
            this.filtroProducto.push(newProducto);
          }
          this.setPage(1);
        }
        else {
          for ( let key in result){
            let marca, imagen, categoria ;
            marca = result[key].marca;
            imagen = result[key].imagen;
            categoria = result[key].categoria;

            var newProducto = result[key];
            newProducto.marca = marca.nombre;
            newProducto.imagen = imagen[0];
            newProducto.categoria = categoria.nombre;
            if (newProducto.categoria === this.nombreCategoria){
              this.filtroProducto.push(newProducto);
              this.habilitar = false;
              this.setPage(1);
            }
          }
          if (this.filtroProducto.length == 0){
              this.pagedItems = [];
          }
        }
      }
    )
  }

  anadir(filtro) {
    console.log(filtro);
    if (filtro.opciones.length === 0){
      filtro.cantidad = 1;
      filtro.subtotal = filtro.cantidad * filtro.precio_promo;
      console.log("Boton añadir");
      this._carritoService.añadirProducto(filtro);

      //Conseguir productos del carrito
      this.carrito = this._carritoService.getProducto();
      console.log(this.carrito);
      document.getElementById('carrito').innerHTML =
        "<p style='color: black'>Carrito <i class=\"fa fa-cart-plus fa-1x \" aria-hidden=\"true\"></i>"+this.carrito.length+"</p>";
      /*document.getElementById(cell.id).innerHTML = "<div style='position: absolute; z-index: 100; ' class=\"alert alert-success alert-dismissable\">\n" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n" +
        "   <i class=\"fa fa-check\" aria-hidden=\"true\"></i> <strong>&nbsp Añadido al carrito &nbsp &nbsp</strong>" +
        "</div>";*/
      swal({
        title: 'Añadido al carrito',
        text: filtro.marca + filtro.modelo,
        html: '<p>'+filtro.marca + filtro.modelo+'</p>',
        imageUrl: filtro.imagen,
        imageWidth: 150,
        imageHeight: 150,
        animation: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#00BFFF',
        cancelButtonText: 'Seguir viendo',
        confirmButtonText: 'Ir al Carrito <span class="fa fa-cart-plus fa-1x " aria-hidden="true"></span>',
      }).then((result) => {
        if (result.value) {
          this._router.navigate(['/carrito']);
        }
      })
    }
    else{
      this._router.navigate(['/producto', filtro.id, filtro.modelo]);
      window.scrollTo(0,0);
    }

  }

  detalles(){
    window.scrollTo(0,0);
  }

  //PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this._paginationService.getPager(this.filtroProducto.length, page);
    // get current page of items
    this.pagedItems = this.filtroProducto.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

}
