import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenVerifyGuard implements CanActivate {
  constructor(private auth: AuthService) {
    this.view();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.auth.isLoggedIn();
  }

 // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>{
  //  return this.canActivate()
  //}

  isLogged:boolean;

  log_update(){
    this.auth.isLoggedIn().subscribe(d=>{
      if(d) this.isLogged = true;
      else this.isLogged = false;
    });
  }

  view(){
    setTimeout(()=>{
      this.view()
    },30000);
    this.auth.isLoggedIn().subscribe(d=>{
      if(d) this.isLogged = true;
      else this.isLogged = false;
    });

  }
}
