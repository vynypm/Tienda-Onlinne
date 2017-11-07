import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  salir(){
    sessionStorage.removeItem('Usuario');
    this._router.navigate(['/home']);
  }

}
