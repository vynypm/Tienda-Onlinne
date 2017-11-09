import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-caract-producto',
  templateUrl: './caract-producto.component.html',
  styleUrls: ['./caract-producto.component.css']
})
export class CaractProductoComponent implements OnInit {

  producto: any = {};
  constructor(private _activatedRoute: ActivatedRoute,
              private _productoService: ProductoService) {

    this._activatedRoute.params.subscribe(
      parametros => {

      }
    );


  }

  ngOnInit() {
  }

}
