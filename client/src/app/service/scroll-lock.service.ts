import { Injectable } from '@angular/core';
import { fromEvent,Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollLockService {

  constructor() { }

  sl: Subscription;

  use(state){
    if(state) {
      let s = window.pageYOffset
      this.sl = fromEvent(document,'scroll').subscribe((e)=>{
        window.scrollTo(s,0);
      });
    }
    else this.sl.unsubscribe();
      
  }

  

}
