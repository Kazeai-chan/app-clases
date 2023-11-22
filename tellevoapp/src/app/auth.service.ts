import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public alumnos = [
    { username: 'Vale', password: '12345' },
    { username: 'Nacho', password: '12345' },
  ];
  public user:any;
  contra:any;
  nombre:any;
  email:any;
  comuna:any;

  getAlumnos() {
    return this.alumnos;
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
