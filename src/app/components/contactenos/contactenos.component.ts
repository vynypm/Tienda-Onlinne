import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
  lat = -0.174496;
  lng = -78.487168;
  zoom = 17;
  constructor() { }

  ngOnInit() {
  }

}
