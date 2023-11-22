import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  viajes:any;
  viajeUsu:any;
  user:any;
  nombre:any;
  viaje:any={
    id:null,
    usuario:this.authservice.nombre,
    comuna:"",
    direccion:"",
    hora:"",
    puestos:"",
    libres:"",
    precio:"",
  };

  constructor(
    private api: ApiService
    , public alertController: AlertController
    ,private authservice: AuthService
    , private router: Router) 
    { 
      this.user=this.authservice.user;
      this.viaje.usuario=this.authservice.nombre;
      if(this.user!){
        console.log(this.user);
        console.log(this.viaje.usuario);
      } else {
        this.router.navigate(['/login']); // Si no tiene extras, navega a la página de inicio de sesión
      }
    }


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
      this.viaje.usuario = this.authservice.nombre
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
    //this.traeNombre()
    this.api.getViajes().subscribe((res)=>{
      // this.viajes=res.filter(item => {
      this.viajes = res.filter( (row:any) => {
        if(row.usuario == this.authservice.nombre) {
          //console.log('prueba:'+row.usuario);
          return true
        } else {
          //console.log('prueba:'+row.usuario+' vs '+this.authservice.nombre);
          return false;
        }
      });
      //this.viajeUsu = this.viajes.filter(this.filtrarPorUser);
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

  VHome(){
    this.router.navigate(['/home']);
  }

}
