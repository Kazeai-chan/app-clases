import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

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


  constructor(private api: ApiService,
    public alertController: AlertController,
    private authservice: AuthService,
    ) { }
  ionViewWillEnter(){
    //console.log('nombre user:'+this.usuario.nombre)
    this.getViajes();
  }

  ngOnInit() {}

  getViajes(){
    //console.log('su nombre es: '+this.authservice.nombre)
    this.api.getViajes().subscribe((res)=>{
      this.viajes = res.filter( (row:any) => {
        if(row.usuario != this.authservice.nombre) {
          //console.log('prueba:'+row.usuario);
          return true
        } else {
          //console.log('prueba:'+row.usuario+' vs '+this.authservice.nombre);
          return false;
        }
      });
      this.viajes.reverse();
    },(error)=>{ 
      console.log(error); 
  });
  }

  Reserva(viajee:any){
    this.viaje=viajee
    if(this.viaje.libres>0){
      this.viaje.libres=this.viaje.libres-1;
      this.api.updateViaje(this.viaje.id,this.viaje).subscribe((data)=>{
        console.log(data); 
        this.getViajes();
        this.presentAlert("Correcto","Viaje reservado")
      },error=>{ 
        console.log(error); 
      });
    }else{
      this.presentAlert("Error","Sin cupos disponibles")
    }
      
  }

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
