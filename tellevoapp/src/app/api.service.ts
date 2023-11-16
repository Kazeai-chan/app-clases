import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { retry, catchError } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = { 
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin' :'*' 
    }) 
  }
  // Se establece la base url del API a consumir 
  apiURL = 'http://localhost:3000';//'http://192.168.0.15:3000';

  constructor(private http:HttpClient) { }

  getViajes():Observable<any>{ 
    return this.http.get(this.apiURL+'/viajes').pipe( 
      retry(3) 
    ); 
  };

  getViaje(id: number):Observable<any>{ 
    return this.http.get(this.apiURL+'/viajes/'+id).pipe( 
      retry(3) 
    ); 
  };

  getUsuario(username: string):Observable<any>{ 
    return this.http.get(this.apiURL+'/usuarios/'+username).pipe( 
      retry(3) 
    ); 
  };

  createViaje(post: string):Observable<any>{ 
    return this.http.post(this.apiURL+'/viajes',post,this.httpOptions) 
    .pipe( retry(3) 
    )
  };

  updateViaje(id: number,post: string):Observable<any>{ 
    return this.http.put(this.apiURL+'/viajes/'+id,post,this.httpOptions).pipe(retry(3)); 
  }

  deleteViaje(id: number):Observable<any>{ 
    return this.http.delete(this.apiURL+'/viajes/'+id,this.httpOptions); 
  }

}
