import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router} from '@angular/router';
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
    public authservice: AuthService,
    private api: ApiService,
  ) {}

  ngOnInit() {
  }

  ingresar() {
    if (this.valida() === true) {
      this.api.getUsuario(this.alumnos.username).subscribe((res)=>{
        this.authservice.guardaDatos(res.nombre,res.email,res.comuna);
      },(error)=>{ 
        console.log(error); 
      });
      this.router.navigate(['/home'])
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

  recupera(){
    this.authservice.guardaUser(this.alumnos.username)
    this.router.navigate(['/rec-cont']);
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
