import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private dbService: DbService) { }

  ngOnInit() {
  }

  eliminarUsuario(){
    this.dbService.eliminarUser();
  }
}
