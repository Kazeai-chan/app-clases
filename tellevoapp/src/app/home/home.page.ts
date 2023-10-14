import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';


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

  data: any; // Generamos una variable Any (permite cualquier valor)

  constructor(private activeroute: ActivatedRoute, private router: Router, private animationCtrl: AnimationController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation()!.extras.state) { // Validamos que en la navegacion actual tenga extras
        this.data = this.router.getCurrentNavigation()!.extras.state; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
      }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navegar al login
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

}


