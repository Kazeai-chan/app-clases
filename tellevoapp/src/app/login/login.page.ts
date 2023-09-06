import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras ,ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  alumnos = {
    usuario: "Vale",
    password: "12345"
  }

  user:any;

  hide = true;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private activeroute: ActivatedRoute,
  ) { 
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      this.user = this.router.getCurrentNavigation()!.extras.state; // Si tiene extra rescata lo enviado
      if(this.user){
        this.alumnos.usuario= String(this.user.user);
      }
    });
  }

  ngOnInit() {
  }

  ingresar() {
    if (this.valida() == true) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.alumnos.usuario
        }
      };
      this.router.navigate(['/home'], navigationExtras);
    }
  }

  valida() {
    if (this.alumnos.usuario.trim().length > 3 && this.alumnos.password.trim().length > 4) {
      return true
    } else {
      this.presentAlert("Error", "Debe ingresar un nombre de usuario y una contraseña válida")
      return false
    }
  }

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
