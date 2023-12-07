import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private direccionFinalSubject = new BehaviorSubject<string>('');

  constructor() { }

  setDireccionFinal(direccion: string) {
    this.direccionFinalSubject.next(direccion);
  }

  getDireccionFinal() {
    return this.direccionFinalSubject.asObservable();
  }
}
