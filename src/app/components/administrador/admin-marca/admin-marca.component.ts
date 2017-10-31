import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-marca',
  templateUrl: './admin-marca.component.html',
  styleUrls: ['./admin-marca.component.css']
})
export class AdminMarcaComponent implements OnInit {

  marcas: any[] = [];
  id: string;
  marca: any = {
    nombre: ""
  }

  constructor(private _marcaService: MarcaService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService) {
    this._marcaService.consultarMarcas()
      .subscribe(
        resultado => {
          this.marcas = resultado;
          console.log(this.marcas);
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
    //console.log(this.marca);
    if (this.id == "nuevo") {
      //GUARDAR NUEVO
      this._marcaService.nuevaMarca(this.marca)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._marcaService.editarMarca(this.marca, this.id)
        .subscribe(
          resultado => {
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

}
