import { Component, OnInit } from '@angular/core';
import {state, style, trigger} from "@angular/animations";
import {AuthService} from "../../service/auth.service";
import {ScrollLockService} from "../../service/scroll-lock.service";
import {TokenVerifyGuard} from "../../guard/token-verify.guard";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {register} from "ts-node";
import {log} from "util";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-flash-activites',
  templateUrl: './flash-activites.component.html',
  styleUrls: ['./flash-activites.component.css'],
  animations: [
    trigger('anim_activity', [
      state('initial', style({
        display: 'none'
      })),
      state('shown', style({
        display: 'flex'
      }))
    ])
  ]
})
export class FlashActivitesComponent implements OnInit {

  countries = require('./country.json');

  avatarPreviewUrl:string = null;

  state = {
    login:'initial',
    register:'initial',
    profile:'initial',
    profile_settings:false
  }

  loading = {
    name:false,
    email:false,
    password:false,
    r_password:false,
    login:false,
    settings:false
  }

  error = {
    name:'',
    email:'',
    password:'',
    r_password:'',
    register_query:'',
    login_query:'',
    settings:{
      name:'',
      email:'',
      password:'',
      query:'',
      img:''
    }
  }

  register_model = {
    name:'',
    email:'',
    password:'',
    r_password:''
  }

  login_model = {
    email:'',
    password:''
  }

  settings_model = {
    name:'',
    description:'',
    email:'',
    country:'',
    password:'',
    avatar: null
  }


  show_password(target){
    let element = document.getElementsByName(target)[0];
    element['type'] == 'password' ? element['type'] = 'text' : element['type'] = 'password';
  }

  changeState(param: string) {
    if (param == 'login') {
      this.state['login'] = this.state['login'] === 'initial' ? 'shown' : 'initial';
    } else if(param == 'register'){
      this.state['register'] = this.state['register'] === 'initial' ? 'shown' : 'initial';
    } else if (param == 'profile'){
      this.state['profile'] = this.state['profile'] === 'initial' ? 'shown' : 'initial';
    } else if(param == 'settings'){
      this.state['profile_settings'] ? this.state['profile_settings'] = false : this.state['profile_settings'] = true;
    }
  }

  constructor(private auth: AuthService, private sl: ScrollLockService, private guard:TokenVerifyGuard, private data:DataService) {
    this.data.data['onchange'] = ()=>{
      this.changeState('login');
      this.sl.use(true);
    };
  }


  ngOnInit(): void {

  }

  validate_name(target){
    this.loading.name = true;
    if(target == 'register'){
      this.error.name = '';
      if(!/^[A-z0-9]{3,32}$/.test(this.register_model.name)){
        this.error.name = '*The name can only consist of letters and numbers and be longer than 3 characters';
      }
    } else if(target == 'settings'){
      console.log()
      this.error.settings.name = '';
      if(!/^[A-z0-9]{3,32}$/.test(this.settings_model.name)){
        this.error.settings.name = '*The name can only consist of letters and numbers and be longer than 3 characters';
      }
    }
    this.loading.name = false;
  }

  validate_Email(target){
    this.loading.email = true;
    if(target == 'register'){
      this.error.email = '';
      if(!/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(this.register_model.email)){
        this.error.email = '*Please enter a valid email';
        this.loading.email = false;
      }else this.auth.post('api/user/email_verify', {'email':this.register_model.email}).subscribe(res=>{
        this.error.email = res['err'];
        this.loading.email = false;
      });
    }else if(target == 'settings') {
      this.error.settings.email = '';
      if(!/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(this.settings_model.email)){
        this.error.settings.email = '*Please enter a valid email';
        this.loading.email = false;
      }else this.auth.post('api/user/email_verify', {'email':this.settings_model.email}).subscribe(res=>{
        this.error.settings.email = res['err'];
        this.loading.email = false;
      });
    }
  }

  validate_password(target){
    this.loading.password = true;
    if(target == 'register'){
      this.error.password = '';
      if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(this.register_model.password)){
        this.error.password = '*The password can contain only characters A-z, 0-9, [@ $!% * #? &], contain a capital letter, number and be longer than 8'
      }
    }else if(target == 'settings'){
      this.error.settings.password = '';
      if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(this.settings_model.password)){
        this.error.settings.password = '*The password can contain only characters A-z, 0-9, [@ $!% * #? &], contain a capital letter, number and be longer than 8'
      }
    }
    this.loading.password = false;
  }

  passwords_mutch(){
    this.loading.r_password = true;
    this.error.r_password = '';
    if(this.register_model.password != this.register_model.r_password){
      this.error.r_password = '*Passwords must match';
    }
    this.loading.r_password = false;
  }

  image_change(filelist){
    if(filelist){
      this.error.settings.img = '';
      if(filelist['type'] != 'image/png' && filelist['type'] != 'image/jpeg' && filelist['type'] != 'image/svg' && filelist['type'] != 'image/gif'){
        this.error.settings.img = '*We pick only (png, jpg, svg, gif) filetypes';
        return
      }
      this.settings_model.avatar = filelist;
      let reader = new FileReader();
      reader.onload = (event)=>{
        this.avatarPreviewUrl = event.target['result'];
      }
      reader.readAsDataURL(this.settings_model.avatar);
      if(filelist['size'] > 1024 * 1024 * 3){
        this.error.settings.img = '*Image size is to large (3mb max)';
      }
    }
  }

  create_user(){
    this.error.register_query = '';
    if(!this.register_model.name || !this.register_model.email || !this.register_model.password || !this.register_model.r_password){
      this.error.register_query = '*Please fill in all fields';
    } else {
      this.auth.new_user(this.register_model).subscribe(r=>{
        if(r['err']){
          this.error.register_query = r['err'];
        }else {
          this.sl.use(false);
          this.changeState('register');
        }
      })
    }
  }

  login(){
    this.loading.login = true;
    this.error.login_query = '';
    this.auth.login(this.login_model).subscribe(r=>{
      if(r['err']){
        this.error.login_query = '*' + r['err'];
        this.loading.login = false;
      } else {
        this.sl.use(false);
        this.changeState('login');
        this.loading.login = false;
      }
    });
  }

  logout(){
    this.auth.logout();
  }

  save_changes(){
    this.loading.settings = true;
    if(this.settings_model.email  || this.settings_model.name || this.settings_model.password || this.settings_model.country || this.settings_model.description || this.settings_model.avatar){
      if((this.settings_model.email && this.error.settings.email) || (this.settings_model.password && this.error.settings.password) || (this.settings_model.name && this.error.settings.name) || (this.settings_model.avatar && this.error.settings.img)){
        this.loading.settings = false;
        return;
      }
      this.auth.edit_user(this.settings_model).subscribe(r=>{
        if(r['jwt']){
          this.loading.settings = false;
          this.state.profile_settings = false;
        }else {
          this.error.settings.query = r['err'];
          this.loading.settings = false;
        }
      })
    }
  }
}
