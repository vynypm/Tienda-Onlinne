import { Component, OnInit } from '@angular/core';
import { OpcionService } from '../../../services/opcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-opciones',
  templateUrl: './admin-opciones.component.html',
  styleUrls: ['./admin-opciones.component.css']
})
export class AdminOpcionesComponent implements OnInit {
  opciones: any[] = [];
  id: string;
  habilitarBoton: boolean = true;
  opcion: any = {
    nombre: ""
  }
  constructor(private _opcionService: OpcionService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute,
              private _usuarioServices: UsuarioService) {

    this._opcionService.consultarOpciones()
      .subscribe(
        resultado => {
          this.opciones = resultado;
          //console.log(this.categorias);
        }
      );
    this._activatedRouter.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== "nuevo") {
            this._opcionService.consultarOpcion(this.id)
              .subscribe(
                resultado => {
                  this.opcion = resultado;
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
      this._opcionService.nuevaOpcion(this.opcion)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this.habilitarBoton = true;
            this._router.navigate(['/registrar-producto', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._opcionService.editarOpcion(this.opcion, this.id)
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
    this._opcionService.eliminarOpcion(id)
      .subscribe(
        resultado => {
          console.log('se eliminó');
          this.opciones.splice(posicion, 1);
        }
      );
  }

}
