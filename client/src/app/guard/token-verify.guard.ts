import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenVerifyGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('jwt') && !this.auth.user) this.auth.update_user();
    console.log(route, state);
    return true;
  }

  user(){
    if(localStorage.getItem('jwt') && !this.auth.user) this.auth.update_user();
    else if(this.auth.user && !this.auth.user['err']) return true;
    return false;
  }
}
