import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
//import { EmailComposer } from '@ionic-native/email-composer';


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
    //private emailComposer: typeof EmailComposer,
  ){}
  

  ionViewWillEnter(){
    this.usuario=this.authservice.user;
  }

  redireccionarALogin() {
    this.authservice.guardaUser(this.usuario)
    // this.emailComposer.isAvailable().then((available: boolean) =>{
    //   if(available) {
    //     this.sendMail();
    //   }
    //  });
    this.router.navigate(['/login']);
  }


  ngOnInit() {
  }

  

}

