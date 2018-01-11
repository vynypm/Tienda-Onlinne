import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { PaginationAdminService } from '../../../services/pagination-admin.service';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css']
})
export class AdminCategoriaComponent implements OnInit {

  categorias: any[] = [];
  id: string;
  habilitarBoton: boolean = true;
  categoria: any = {
    nombre: ""
  }
  pager: any = {}; // pager object
  pagedItems: any[] = []; // paged items

  constructor(private _categoriaService: CategoriaService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService, private _paginationService: PaginationAdminService) {
    this._categoriaService.consultarCategorias()
      .subscribe(
        resultado => {
          this.categorias = resultado;
          this.setPage(1);
        }
      );
    this._activatedRouter.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== "nuevo") {
            this._categoriaService.consultarCategoria(this.id)
              .subscribe(
                resultado => {
                  this.categoria = resultado;
                }
              )
          }
        }
      );
  }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    })
  }

  guardar() {
    this.habilitarBoton = false;
    //console.log(this.marca);
    if (this.id === "nuevo") {
      //GUARDAR NUEVO
      this._categoriaService.nuevaCategoria(this.categoria)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this.habilitarBoton = true;
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._categoriaService.editarCategoria(this.categoria, this.id)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this.habilitarBoton = true;
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }

  }

  eliminar(id: string, posicion: number) {
    this._categoriaService.eliminarCategoria(id)
      .subscribe(
        resultado => {
          console.log('se eliminó');
          this.categorias.splice(posicion, 1);
        }
      );
  }
//PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this._paginationService.getPager(this.categorias.length, page);
    // get current page of items
    this.pagedItems = this.categorias.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }
}
