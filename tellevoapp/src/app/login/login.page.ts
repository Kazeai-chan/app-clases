import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  alumnos: any = {
    username: 'Vale', // Inicializa con un valor predeterminado
    password: '12345', // Inicializa con un valor predeterminado
  };
  hide = true;

  constructor(
    private router: Router,
    public alertController: AlertController,
    public authservice: AuthService
  ) {}

  ngOnInit() {
    // Obtén la lista de alumnos del servicio y utiliza el primer elemento
    // const firstAlumno = this.authservice.getAlumnos()[0];
    // this.alumnos.username = firstAlumno.username;
    // this.alumnos.password = firstAlumno.password;
  }

  ingresar() {
    if (this.valida() === true) {
      this.router.navigate(['/home'])
      //this.router.navigate(['/home'], {
      //   queryParams: {
      //     username: this.alumnos.username,
      //     password: this.alumnos.password,
      //   },
        //state: { user: this.alumnos.username, password: this.alumnos.password },
      //});
    }
  }

  valida() {
    if (this.alumnos.username.trim().length > 3 && this.alumnos.password.trim().length > 4) {
      this.authservice.guardaAlumno(this.alumnos.username,this.alumnos.password);
      return true;
    } else {
      this.presentAlert('Error', 'Debe ingresar un nombre de usuario y una contraseña válida');
      return false;
    }
  }

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
