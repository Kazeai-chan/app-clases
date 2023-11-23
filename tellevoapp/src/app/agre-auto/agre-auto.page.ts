import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agre-auto',
  templateUrl: './agre-auto.page.html',
  styleUrls: ['./agre-auto.page.scss'],
})
export class AgreAutoPage implements OnInit {

  vehiculo:any={
    id:this.authservice.user,
    id_auto:null,
    marca:"",
    patente:"",
    modelo:"",
    tipo:"auto",
  };
  user:any;

  constructor(private api: ApiService
    , public alertController: AlertController
    ,private authservice: AuthService
    , private router: Router) { 
      this.user=this.authservice.user;
      if(this.user!){
        console.log(this.user);
      } else {
        this.router.navigate(['/login']); // Si no tiene extras, navega a la página de inicio de sesión
      }
    }

  ngOnInit() {
  }

  createViaje(){ 
    this.vehiculo.id = this.authservice.user
    if(this.vehiculo.marca!
      &&this.vehiculo.patente!
      &&this.vehiculo.modelo!){
      this.api.createVehiculo(this.vehiculo).subscribe((success)=>{
        console.log(success); 
        this.limpiar();
        this.presentAlert("Correcto","Vehiculo guardado guardado, se redirigirá al Home")
        this.VHome();
      },error=>{ 
        console.log(error); 
      });
    }else{
      console.log(this.vehiculo);
      this.presentAlert("Error","Debe llenar todos los campos")
    }
  }

  limpiar(){
    for (var [key, value] of Object.entries(this.vehiculo)) {
      Object.defineProperty(this.vehiculo,key,{value:""})
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

  VHome(){
    this.router.navigate(['/home']);
  }
}
