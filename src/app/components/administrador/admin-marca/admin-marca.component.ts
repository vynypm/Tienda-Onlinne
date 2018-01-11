import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationAdminService } from '../../../services/pagination-admin.service';

@Component({
  selector: 'app-admin-marca',
  templateUrl: './admin-marca.component.html',
  styleUrls: ['./admin-marca.component.css']
})
export class AdminMarcaComponent implements OnInit {

  marcas: any[] = [];
  id: string;
  habilitarBoton: boolean = true;
  marca: any = {
    nombre: ""
  }

  pager: any = {}; // pager object
  pagedItems: any[] = []; // paged items

  constructor(private _marcaService: MarcaService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService, private _paginationService: PaginationAdminService) {
    this._marcaService.consultarMarcas()
      .subscribe(
        resultado => {
          this.marcas = resultado;
          this.setPage(1);
        }
      );
    this._activatedRouter.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== "nuevo") {
            this._marcaService.consultarMarca(this.id)
              .subscribe(
                resultado => {
                  this.marca = resultado;
                }
              );
          }
        }
      );
  }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result:boolean)=>{
      if (!result) {
        this._router.navigate(['/login']);
      }
    });
  }

  guardar() {
    this.habilitarBoton = false;
    //console.log(this.marca);
    if (this.id === "nuevo") {
      //GUARDAR NUEVO
      this._marcaService.nuevaMarca(this.marca)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this.habilitarBoton = true;
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._marcaService.editarMarca(this.marca, this.id)
        .subscribe(
          resultado => {
            this.habilitarBoton = true;
            //console.log(resultado);
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }

  }

  eliminar(id: string, posicion: number) {
    this._marcaService.eliminarMarca(id)
      .subscribe(
        resultado => {
          console.log('se eliminó');
          this.marcas.splice(posicion, 1);
        }
      );
  }
//PARA LA PAGINACION
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this._paginationService.getPager(this.marcas.length, page);
    // get current page of items
    this.pagedItems = this.marcas.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }
}
