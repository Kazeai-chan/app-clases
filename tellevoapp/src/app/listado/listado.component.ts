import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { MailgunService } from '../mailgun.service'
import { SharedDataService } from '../shared-data.service';
import { ViajesPage } from '../viajes/viajes.page';



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
    user:"",
    correo:"",
    comuna:"",
    direccion:"",
    puestos:"",
    libres:"",
    precio:"",
  };


  constructor(private api: ApiService,
    public alertController: AlertController,
    private authservice: AuthService,
    private mailgunService: MailgunService,
    private shareDataService: SharedDataService,
    private ViajesP: ViajesPage,
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

  Reserva(direccion: string,viajee:any){
    this.viaje=viajee
    if(this.viaje.libres>0){
      this.viaje.libres=this.viaje.libres-1;
      this.api.updateViaje(this.viaje.id,this.viaje).subscribe((data)=>{
        //console.log(data); 
        this.activaMaps(direccion);
        this.ViajesP.cambiaMapa();
        this.getViajes();
        this.presentAlert("Correcto","Viaje reservado correctamente, se ha enviado un correo de confirmación")
        console.log(this.viaje.correo)
        this.enviarCorreo(this.viaje.usuario,this.viaje.correo,this.viaje.direccion,this.viaje.comuna);
      },error=>{ 
        console.log(error); 
      });
    }else{
      this.presentAlert("Error","Sin cupos disponibles")
    }
      
  }

  activaMaps(direccion: string){
    this.shareDataService.setDireccionFinal(direccion);
    console.log(direccion)
  }


  enviarCorreo(dueño:string,correo:string,direccion:string,comuna:string){
    // correo a pasajero
    //var mensaje:string
    var mmensaje:string
    //mensaje= "Estimado: "+this.authservice.nombre+" su viaje con "+dueño+" se ha reservado correctamente."
    mmensaje='<div dir="ltr">Estimado '+this.authservice.nombre+':<div><br></div><div>Su viaje  con '+dueño+' a '+direccion+', '+comuna+' ha sido reservado correctamente.</div><div><br></div><div>Atte.</div><font color="#888888"><div>TeLlevoApp</div><div><br></div></font></div>'
    this.mailgunService.enviarCorreo(this.authservice.email,'Viaje reservado',mmensaje);
    // correo a dueño
    //var mensaje2:string
    var mmensaje2:string
    //mensaje2= "Estimado: "+dueño+": "+this.authservice.nombre+" ha reservado un viaje en su vehículo."
    mmensaje2 = '<div dir="ltr">Estimado '+dueño+':<div><br></div><div>Su viaje a '+direccion+', '+comuna+' ha sido reservado por '+this.authservice.nombre+'.</div><div><br></div><div>Atte.</div><font color="#888888"><div>TeLlevoApp</div><div><br></div></font></div>'
    this.mailgunService.enviarCorreo(correo,'Se ha reservado un puesto en su viaje',mmensaje2);
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
