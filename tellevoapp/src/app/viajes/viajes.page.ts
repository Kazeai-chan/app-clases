import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { ListadoComponent } from '../listado/listado.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  user: any;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  @ViewChild(ListadoComponent) listado!: ListadoComponent;

  ionViewWillEnter() {
    this.user = this.activatedRoute.snapshot.params['username'];
    console.log(this.user); 
    this.listado.getViajes();
  }

  ngOnInit() {
  }

  segment = 'lista';
}