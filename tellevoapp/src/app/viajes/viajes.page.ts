import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { ListadoComponent } from '../listado/listado.component';
import { AuthService } from '../auth.service';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  user: any;
  usuario: any;

  constructor(
    //private activatedRoute: ActivatedRoute,
    private authservice: AuthService
    , private router: Router) {
    this.usuario=this.authservice.user;
    if(this.usuario!){
      console.log(this.usuario)
    } else {
      this.router.navigate(['/login']); // Si no tiene extras, navega a la página de inicio de sesión
    }
  }

  @ViewChild(ListadoComponent) listado!: ListadoComponent;

  ionViewWillEnter() {
    this.usuario=this.authservice.user;
    this.listado.getViajes();
    this.printCurrentPosition()
  }

  recargarViajes(){
    this.listado.getViajes();
    this.segment="listado"
  }

  ngOnInit() {
  }

  public segment = 'lista';

  VHome(){
    this.router.navigate(['/home']);
  }

  async printCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  };

  cambiaMapa(){
    this.segment="mapa2"
  }
}