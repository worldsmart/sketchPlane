import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../../service/auth.service';
import { ScrollLockService } from '../../service/scroll-lock.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
  	trigger('anim_reg',[
         state('initial',style({
            display:'none'
         })),
         state('shown',style({
            display:'flex'
         }))
      ])
  ]
})
export class NavbarComponent implements OnInit {

	currentState = 'initial';
	currentState_l = 'initial';

	changeState(param:string) {
		if(param){
			this.currentState_l = this.currentState_l === 'initial' ? 'shown' : 'initial';
		}
		else{
			this.currentState = this.currentState === 'initial' ? 'shown' : 'initial';
		}
	}

  constructor(private auth:AuthService,private sl:ScrollLockService) { }

  ngOnInit() {

  }

  scrollLock(state){	
  	this.sl.use(state);
  }

  signUp(data){
  	//if(data.valid){
  		this.auth.newUser(data.value);
  //	}	
  }

}
