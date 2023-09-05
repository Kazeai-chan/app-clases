import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  alumnos = {
    usuario : "Vale",
    password : "12345"
  }

  hide = true;

  constructor(private router: Router , public alertController: AlertController) { } 

  ngOnInit() {
  }

  ingresar(){
    if(this.valida()==true){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.alumnos.usuario // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
    //this.router.navigate(['/home', { value: this.usuario.user}]);
    }
  }
  valida(){
    if(this.alumnos.usuario.trim().length>3 && this.alumnos.password.trim().length>4){
      return true
    }else{
      this.presentAlert("Error","Debe ingresar un nombre de usuario y una contraseña válida")
      return false
    }
  }

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
