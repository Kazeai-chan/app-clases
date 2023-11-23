import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('aniUno', { read: ElementRef }) aniUno!: ElementRef;
  @ViewChild('ani2', { read: ElementRef }) ani2!: ElementRef;


  private animation!: Animation;
  private animatione!: Animation;

  user: any;
  data: any; // Generamos una variable Any (permite cualquier valor)
  usuario:any;
  autos:any;
  segment:any;
  aut:any;


  constructor(
    // private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private animationCtrl: AnimationController, 
    private navCtrl: NavController ,
    private api: ApiService,
    private authservice: AuthService
    ){
      this.usuario=this.authservice.user;
      if(this.usuario!){
        console.log(this.usuario)
      } else {
        this.router.navigate(['/login']); // Si no tiene extras, navega a la página de inicio de sesión
      }
    }

  ionViewWillEnter(){
    this.usuario=this.authservice.user;
    this.buscaAutos()
    this.buscaAuto()
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.aniUno.nativeElement)
      .duration(300)
      .iterations(3)
      // .fromTo('transform', 'translateX(0px)', 'translateX(50%)')
      // .fromTo('opacity', '1', '0.2')
      .keyframes([
      { offset: 0, transform: 'translateX(0)' },
      { offset: 0.4, transform: 'translateX(20px)' },
      { offset: 0.8, transform: 'translateX(-20px)' },
      { offset: 1, transform: 'translateX(0)' },
      ]);
      ;
    this.animatione = this.animationCtrl
      .create()
      .addElement(this.ani2.nativeElement)
      .duration(300)
      .iterations(3)
      .keyframes([
      { offset: 0, transform: 'translateX(0)' },
      { offset: 0.4, transform: 'translateX(20px)' },
      { offset: 0.8, transform: 'translateX(-20px)' },
      { offset: 1, transform: 'translateX(0)' },
      ]);
      ;
    
      this.play();
  }

  async play() {
    await this.animation.play();
    await this.animatione.play();
  }

  botonViajes() {
    this.navCtrl.navigateForward(`/viajes`);
  }

  botonVehiculos(){
    this.router.navigate(['/vehiculos']);
  }
  botonAuto(){
    this.router.navigate(['/agre-auto']);
  }


  buscaAutos(){
    this.api.getVehiculos().subscribe((res)=>{
      this.autos = res.filter( (row:any) => {
        if(row.id == this.usuario) {
          console.log('correcto:'+row.id);
          return true
        } else {
          console.log('error:'+row.id);
          return false;
        }
      });
      //this.authservice.guardaAutos(res);
    },(error)=>{ 
      console.log(error); 
    });
  }

  buscaAuto(){
    this.api.getVehiculo(this.usuario).subscribe((res)=>{
      this.aut=res.tipo;
      this.segment=res.tipo;
    },(error)=>{ 
      console.log(error); 
    });
  }

}


