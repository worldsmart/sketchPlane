import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenVerifyGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| boolean{
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/main']);
      return false;
    }
    else{
      return this.auth.get('api/admin/role-verify', localStorage.getItem('jwt')).pipe(map(data=>{
        if(data['success']){
          return true;
        }
        else {
          this.router.navigate(['/main']);
          return false;
        }
      }));
    }
  }

  user(){
    if(localStorage.getItem('jwt') && !this.auth.user) this.auth.update_user();
    else if(this.auth.user && !this.auth.user['err']) return true;
    return false;
  }
  moder(){
    if(localStorage.getItem('jwt') && !this.auth.user) this.auth.update_user();
    else if(this.auth.user && !this.auth.user['err'] && this.auth.user['role'] == 1) return true;
    return false;
  }
  admin(){
    if(localStorage.getItem('jwt') && !this.auth.user) this.auth.update_user();
    else if(this.auth.user && !this.auth.user['err'] && this.auth.user['role'] == 2) return true;
    return false;
  }
}
