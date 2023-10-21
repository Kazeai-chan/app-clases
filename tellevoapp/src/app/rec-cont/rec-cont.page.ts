import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rec-cont',
  templateUrl: './rec-cont.page.html',
  styleUrls: ['./rec-cont.page.scss'],
})
export class RecContPage {
  usuario="";

  
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authservice: AuthService,
  ){}
  

  ionViewWillEnter(){
    this.usuario=this.authservice.user;
  }

  redireccionarALogin() {
    this.authservice.guardaUser(this.usuario)
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}

