import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {WsService} from "../service/ws.service";

@Injectable({
  providedIn: 'root'
})
export class WsDisconnectGuard implements  CanDeactivate<boolean>{
  constructor(private ws:WsService){}
  canDeactivate(component, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.ws.disconnect();
    return true;
  }
}
