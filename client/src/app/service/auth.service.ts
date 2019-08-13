import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

  }

  user;

  post(url, data, au = '') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': au
      })};
    return this.http.post(url, data, httpOptions);
  }
  get(url, authorization = ''){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authorization
      })};
    return this.http.get(url, httpOptions);
  }
  lock:boolean = false;
  avatar:File = null;
  update_user(){
    if(!this.lock){
      this.lock = true;
      this.get('api/user/data', localStorage.getItem('jwt')).subscribe(user=>{
        if(!user['avatar']){
          user['avatar'] = './assets/img/default.svg';
        }else {
          user['avatar'] = 'data:image/jpeg;base64,' + user['avatar'];
        }
        this.user = user;
        this.lock = false;
      });
    }
  }
  new_user(user){
    const tmp = {
      'name':user['name'],
      'email':user['email'],
      'pass':user['password']
    }
    return this.post('api/user/new', tmp).pipe(map(r=>{
      if(!r['err']) {
        localStorage.setItem('jwt', r['jwt']);
        this.update_user();
      }
      return r;
    }));
  }
  login(candidate){
    return this.post('api/user/login', candidate).pipe(map(r=>{
      if(r['jwt']){
        localStorage.setItem('jwt',r['jwt']);
        this.update_user();
      }
      return r;
    }));
  }
  logout(){
    localStorage.removeItem('jwt');
    this.user = undefined;
  }
  save_avatar(avatar){
    let formData = new FormData();
    formData.append('Authorization', localStorage.getItem('jwt'));
    formData.append('avatar', avatar);
    this.http.post('api/user/save_avatar', formData).subscribe(r=>{
      if(r['success']){
        this.lock = false;
        this.update_user()
      }
    })
  }
  edit_user(data){
    if(data['avatar']){
      this.save_avatar(data['avatar']);
      delete data['avatar'];
    }
    return this.post('api/user/edit', data, localStorage.getItem('jwt')).pipe(map((r)=>{
      if(r['jwt']){
        localStorage.setItem('jwt',r['jwt']);
        this.update_user();
      }
      return r;
    }));
  }
}
