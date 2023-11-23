import { Injectable } from '@angular/core';
import { IonList } from '@ionic/angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api:ApiService){}

  public alumnos = [
    { username: 'Vale', password: '12345' },
    { username: 'Nacho', password: '12345' },
    { username: 'Robert', password: '12345' },
  ];
  public user:any;
  contra:any;
  public nombre:any;
  public email:any;
  public comuna:any;
  public vehiculo:any;
  public vehiculos:any;

  getAlumnos() {
    return this.alumnos;
  }

  getAutos(){
    this.api.getVehiculo(this.user).subscribe((res)=>{
      this.vehiculo=res.tipo;
      console.log(this.vehiculo)
    },(error)=>{ 
      console.log(error); 
    });
  }



  guardaAlumno(user:string,psw:string){
    this.user=user;
    this.contra=psw;
    //console.log(this.user)
  }

  guardaUser(user:string){
    this.user=user;
  }

  guardaDatos(nom:string,mail:string,comun:string){
    this.nombre = nom;
    this.email = mail;
    this.comuna = comun;
  }

  guardaAutos(paten:string){
    this.vehiculo=paten;
  }

  validaUser(){
    if(this.alumnos.some(alumno => alumno.username === this.user && alumno.password === this.contra)){
      console.log('Usuario '+this.user+' validado');
      return true
    } else {
      console.log('incorrecto');
      return false;
    };
  };


}
