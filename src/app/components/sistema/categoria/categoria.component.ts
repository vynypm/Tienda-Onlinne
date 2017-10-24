import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  id: string;
  categoria: any = {
    nombre: ""
  }

  constructor(private _categoriaService: CategoriaService,
              private _router: Router,private _activatedRouter: ActivatedRoute) {
    this._categoriaService.consultarCategorias()
      .subscribe(
        resultado => {
          this.categorias = resultado;
          //console.log(this.categorias);
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
  }

  guardar() {
    //console.log(this.marca);
    if (this.id == "nuevo") {
      //GUARDAR NUEVO
      this._categoriaService.nuevaCategoria(this.categoria)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this._router.navigate(['/registro', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._categoriaService.editarCategoria(this.categoria, this.id)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this._router.navigate(['/registro', 'nuevo' ]);
          }
        );
    }

  }

}
