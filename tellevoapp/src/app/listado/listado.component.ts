import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    IonicModule,
    MatGridListModule,
    MatIconModule,
  ]
})
export class ListadoComponent  implements OnInit {

  viajes:any;
  viaje:any={
    id:null,
    usuario:"",
    comuna:"",
    direccion:"",
    puestos:"",
    libres:"",
    precio:"",
  };

  constructor(private api: ApiService) { }
  ionViewWillEnter(){
    this.getViajes();
  }

  ngOnInit() {}

  getViajes(){
    this.api.getViajes().subscribe((res)=>{
      this.viajes=res;
      this.viajes.reverse();
    },(error)=>{ 
      console.log(error); 
  });
  }

}
