import { Injectable } from '@angular/core';
import { IonList } from '@ionic/angular';
import { ApiService } from './api.service';
import { Preferences } from '@capacitor/preferences';

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
  public patente:any;

  getAlumnos() {
    return this.alumnos;
  }

  getAutos(){
    this.api.getVehiculo(this.user).subscribe((res)=>{
      this.vehiculo=res.tipo;
      console.log(this.vehiculo)
      //this.setPatente(res.patente);
    },(error)=>{ 
      console.log(error); 
    });
  }



  guardaAlumno(user:string,psw:string){
    this.user=user;
    this.contra=psw;
    this.setName(user);
    //this.comuna = Preferences.get({ key: 'name' });
    //console.log(`Hello ${this.comuna}!`);
    //console.log(this.user)
  }

  guardaUser(user:string){
    this.user=user;
  }

  async setName(usa:string){
    await Preferences.set({
      key: 'name',
      value: usa,
    });
  };

  async setDatos(nom:string){
    await Preferences.set({
      key: 'nombre',
      value: nom,
    });
  };

  async setPatente(pat:string){
    await Preferences.set({
      key: 'patente',
      value: pat,
    });
  };

  async checkName(){
    const { value } = await Preferences.get({ key: 'name' });
    console.log(`Hello ${value}!`);
    return value;
  };

  async checkPatente(){
    const { value } = await Preferences.get({ key: 'patente' });
    console.log(`Patente ${value}!`);
    this.patente = value;
    return value;
  };

  async checkNombre(){
    const { value } = await Preferences.get({ key: 'nombre' });
    this.nombre = value;
    return value;
  };

  guardaDatos(nom:string,mail:string,comun:string){
    this.setDatos(nom);
    this.checkNombre();
    //this.nombre = nom;
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
