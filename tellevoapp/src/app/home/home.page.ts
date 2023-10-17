import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { NavController } from '@ionic/angular';


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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private animationCtrl: AnimationController, private navCtrl: NavController) {
    // Se llama a la ruta activa y se obtienen sus parámetros mediante una suscripción
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) { // Utilizamos el operador '?'
        this.data = this.router.getCurrentNavigation()?.extras.state; // Utilizamos el operador '?'
        this.user = this.data.user;
        console.log(this.data); // Muestra por consola lo que se trajo

      } else {
        this.router.navigate(['/login']); // Si no tiene extras, navega a la página de inicio de sesión
      }
    });
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
    this.navCtrl.navigateForward(`/viajes/${this.user}`);
  }

  botonVehiculos(){
    this.router.navigate(['/vehiculos']);
  }

}


