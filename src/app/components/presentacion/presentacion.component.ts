import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FooterComponent } from '../shared/footer/footer.component';
import { ServicesComponent } from '../shared/services/services.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',

})
export class PresentacionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
