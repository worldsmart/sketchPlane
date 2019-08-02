import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {}
  post(data: any, url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(url, data, httpOptions);
  }
  isLoggedIn() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: sessionStorage.getItem('jwt')
      })
    };
    if (sessionStorage.getItem('jwt')) {
    return this.http.get('api/token_verify', httpOptions).pipe(map(data => {
      if (data['success']) {
        return true;
      } else { return false; }
    }));
    } else { return new BehaviorSubject(false); }
  }
  getUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: sessionStorage.getItem('jwt')
      })
    };
    return this.http.get('api/profile', httpOptions).pipe(map(data => {
      this.user = data;
    })).subscribe();
  }
}
