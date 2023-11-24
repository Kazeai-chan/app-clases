import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailgunService {

  constructor(private http: HttpClient) { }

  enviarCorreo(destinatario: string, asunto: string, contenido: string){
  //enviarCorreo(){
    const apiKey = '';
    const domain = '';
    const mailgunApiUrl = `https://api.mailgun.net/v3/${domain}/messages`;

    const headers = {
      'Authorization': `Basic ${btoa(`api:${apiKey}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      'from': 'TeLlevoApp <>', 
      'to': destinatario,
      'subject': asunto,
      //'text': contenido,
      'html':contenido,
    });

    this.http.post(mailgunApiUrl, body.toString(), { headers })
      .subscribe(response => {
        console.log('Correo enviado con éxito:', response);
      }, error => {
        console.error('Error al enviar el correo:', error);
      });

  }
}
