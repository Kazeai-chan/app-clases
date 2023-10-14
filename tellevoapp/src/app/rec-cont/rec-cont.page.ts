import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-rec-cont',
  templateUrl: './rec-cont.page.html',
  styleUrls: ['./rec-cont.page.scss'],
})
export class RecContPage implements OnInit {
  constructor(private navCtrl: NavController
    ,private router: Router,) {}
  usuario = '';

  redireccionarALogin() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario
      }
    };
    this.router.navigate(['/login'], navigationExtras);
    //this.navCtrl.navigateForward('/login');
  }

  ngOnInit() {
  }
}

