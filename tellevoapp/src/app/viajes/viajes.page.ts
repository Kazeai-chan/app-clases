import { Component, OnInit ,ViewChild } from '@angular/core';
import { ListadoComponent } from '../listado/listado.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  constructor() { }

  @ViewChild(ListadoComponent) listado!: ListadoComponent;

  ionViewWillEnter(){
    this.listado.getViajes();
  }

  ngOnInit() {
  }
  segment = 'lista';

}
