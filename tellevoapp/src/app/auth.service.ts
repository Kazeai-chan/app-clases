import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public alumnos = [
    { username: 'Vale', password: '12345' },
    { username: 'Nacho', password: '12345' },
  ];

  getAlumnos() {
    return this.alumnos;
  }
}
