import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../../service/auth.service';
import { ScrollLockService } from '../../service/scroll-lock.service';

import { load } from 'recaptcha-v3'
import {element} from "protractor";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
  	trigger('anim_reg', [
         state('initial', style({
            display: 'none'
         })),
         state('shown', style({
            display: 'flex'
         }))
      ])
  ]
})

export class NavbarComponent implements OnInit {

	currentState = 'initial';
	currentState_l = 'initial';

	loading = {
	  'name': false,
    'email': false,
    'pass': false,
    'rpass': false,
    'login':false
  };

	errors = {
    'name': '',
    'email': '',
    'pass': '',
    'rpass': '',
    'login':''
  }

  public r_data = {
    'name': '',
    'email': '',
    'pass': '',
    'rpass': '',
  }

  public l_data = {
    'email': '',
    'pass': '',
  }

	changeState(param: string) {
		if (param) {
			this.currentState_l = this.currentState_l === 'initial' ? 'shown' : 'initial';
		} else {
			this.currentState = this.currentState === 'initial' ? 'shown' : 'initial';
		}
	}

  constructor(private auth: AuthService, private sl: ScrollLockService) { }

  ngOnInit() {

  }

  check_name(){
    this.allF =false;
	  this.loading.name = true;
    this.errors.name = '';
	  if(this.r_data.name && !/^[A-z0-9]{3,32}$/.test(this.r_data.name)){
	    this.errors.name ='The name must contain A-z 0-9 letters and be longer than 3 characters.';
    }
    this.loading.name = false;
  }

  check_email(){
    this.allF =false;
	  this.loading.email = true;
    this.errors.email = '';
    if(this.r_data.email && !/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(this.r_data.email)){
      this.errors.email = 'Please enter a valid email';
      this.loading.email = false;
      return;
    }
    this.auth.post({'email':this.r_data.email}, 'api/validate_email').subscribe(res=>{
      if(res['exists']){
        this.errors.email = 'Email already taken';
        this.loading.email = false;
        return;
      }
    });
    this.loading.email = false;
  }

  check_password(){
    this.allF =false;
    this.loading.pass = true;
    this.errors.pass = '';
    if(this.r_data.pass && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(this.r_data.pass)){
      this.errors.pass ='The password can contain only the characters A-z, 0-9, @, #, * and must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number.';
    }
    this.loading.pass = false;
  }

  check_pmatch(){
    this.allF =false;
    this.loading.rpass = true;
    this.errors.rpass = '';
    if(this.r_data.rpass && this.r_data.rpass != this.r_data.pass){
      this.errors.rpass = 'Paswords must match.';
    }
    this.loading.rpass = false;
  }

  scrollLock(state) {
  	this.sl.use(state);
  }

  show_password(target:string){
	    var element = document.getElementsByName(target)[0];
	    element['type'] == 'password' ? element['type'] = 'text' :  element['type'] = 'password';
  }

  async rc(cb) {
    const recaptcha = await load('6Lfz8a0UAAAAAO1fGLfcW0U8nDHI6Jj2rEqc40qT',{
      useRecaptchaNet: true,
      autoHideBadge: true
    });
    const token = await recaptcha.execute('homepage').then((token) => {
      cb(token);
    })

  }

  allF:boolean;

  onSubmit(){
	  //this.rc((token)=>{
   //   console.log(token);
   // });

    if(!this.r_data.pass || !this.r_data.rpass || !this.r_data.name || !this.r_data.email){
      this.allF = true;
      return;
    }
    if(!this.errors.pass && !this.errors.rpass && !this.errors.name && !this.errors.email){
      this.auth.post(this.r_data, '/api/data').subscribe((res)=>{
        console.log(res);
      });
      this.changeState("");
      this.scrollLock(false);
    }
  }
  onLogin(){
    this.loading.login = true;
    this.auth.post( this.l_data, 'api/data').subscribe((res)=>{
      if(res['error']){
        this.errors.login = res['error'];
        this.loading.login = false;
        return;
      }
      else {
        console.log(res);
        this.errors.login = res['email'];
        this.loading.login = false;
      }
    });
  }
}
