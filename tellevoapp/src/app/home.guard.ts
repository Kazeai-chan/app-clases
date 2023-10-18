import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router, private authservice: AuthService, private alertController: AlertController) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const username = route.queryParams['username'];
    const password = route.queryParams['password'];

    const userAuthenticated = this.authservice.alumnos.some(alumno => alumno.username === username && alumno.password === password);

    //if (userAuthenticated) {
    if (this.authservice.validaUser()) {
      return true; 
    } else {
      this.presentAlert();
      return false; 
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error de autenticación',
      message: 'Su usuario no se encuentra dentro de la lista de usuarios permitidos.',
      buttons: ['OK']
    });

    await alert.present();
  }
}