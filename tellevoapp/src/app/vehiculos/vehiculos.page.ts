import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  viajes:any;
  viaje:any={
    id:null,
    usuario:"",
    comuna:"",
    direccion:"",
    hora:"",
    puestos:"",
    libres:"",
    precio:"",
  };

  constructor(private api: ApiService, public alertController: AlertController) { }

  ionViewWillEnter(){
    this.getViajes();
  }

  ngOnInit() {
  }
  limpiar(){
    for (var [key, value] of Object.entries(this.viaje)) {
      Object.defineProperty(this.viaje,key,{value:""})
    }
  }

  createViaje(){ 
    if(this.viaje.id==null){
      if(this.viaje.usuario!
        &&this.viaje.comuna!
        &&this.viaje.direccion!
        &&this.viaje.hora!
        &&this.viaje.puestos!
        &&this.viaje.precio!){
        this.viaje.libres=this.viaje.puestos;
        this.api.createViaje(this.viaje).subscribe((success)=>{
          console.log(success); 
          this.limpiar();
          this.getViajes();
          this.presentAlert("Correcto","Viaje guardado")
        },error=>{ 
          console.log(error); 
        });
      }else{
        console.log(this.viaje);
        this.presentAlert("Error","Debe llenar todos los campos")
      }
    }else{
      this.viaje.libres=this.viaje.puestos;
      this.api.updateViaje(this.viaje.id,this.viaje).subscribe((data)=>{
        console.log(data); 
        this.limpiar();
        this.getViajes();
        this.presentAlert("Correcto","Viaje modificado")
      },error=>{ 
        console.log(error); 
      });
    }
  }

  getViajes(){
    this.api.getViajes().subscribe((res)=>{
      this.viajes=res;
      this.viajes.reverse();
    },(error)=>{ 
      console.log(error); 
  });
  }

  BorraViaje(viaje:any){
    this.api.deleteViaje(viaje.id).subscribe((data)=>{
      this.getViajes();
      this.presentAlert("Información","Viaje eliminado")
    },error=>{ 
      console.log(error); 
    });
  }

  TraeViaje(viajee:any){
    this.viaje=viajee
    this.presentAlert("Información","Edite los cambios y presione en guardar")
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
