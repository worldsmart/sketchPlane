import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  newUser(data){

  const httpOptions = {
  	headers: new HttpHeaders({
   	 'Content-Type':  'application/json'
 	 })
	};
  	this.http.post('/api/newuser', data, httpOptions).subscribe((data)=>{
        console.log(data);
      });
  }

  pasteData(url,data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('/api/' + url, data, httpOptions);
  }
}
