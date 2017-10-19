import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-sistema',
  templateUrl: './navbar-sistema.component.html',
  styleUrls: ['./navbar-sistema.component.css']
})
export class NavbarSistemaComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  salir(){
  	sessionStorage.removeItem('Usuario');
  	this._router.navigate(['/login']);
  }

}
