import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcas: any[] = [];
  id: string;
  marca: any = {
    nombre: ""
  }

  constructor(private _marcaService: MarcaService,
              private _router: Router,private _activatedRouter: ActivatedRoute) {
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
  }

  guardar() {
    //console.log(this.marca);
    if (this.id == "nuevo") {
      //GUARDAR NUEVO
      this._marcaService.nuevaMarca(this.marca)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this._router.navigate(['/registro', 'nuevo' ]);
          }
        );
    }else {
      //MODIFICAR
      this._marcaService.editarMarca(this.marca, this.id)
        .subscribe(
          resultado => {
            //console.log(resultado);
            this._router.navigate(['/registro', 'nuevo' ]);
          }
        );
    }

  }

}
