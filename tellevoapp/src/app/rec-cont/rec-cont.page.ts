import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rec-cont',
  templateUrl: './rec-cont.page.html',
  styleUrls: ['./rec-cont.page.scss'],
})
export class RecContPage implements OnInit {
  constructor(private navCtrl: NavController) {}
  usuario = '';

  redireccionarALogin() {
      this.navCtrl.navigateForward('/login');
  }

  ngOnInit() {
  }
}

