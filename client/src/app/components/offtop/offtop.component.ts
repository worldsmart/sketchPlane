import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import {WsService} from "../../service/ws.service";
import {AuthService} from "../../service/auth.service";
import {TokenVerifyGuard} from "../../guard/token-verify.guard";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-offtop',
  templateUrl: './offtop.component.html',
  styleUrls: ['./offtop.component.css']
})
export class OfftopComponent implements OnInit,OnDestroy{

  onMsg = (res)=>{
    this.add_post(res['data']);
  }

  counter = 0;

  constructor(private ws:WsService, private auth:AuthService,private guard:TokenVerifyGuard, private data:DataService) {
    this.ws.connect(this.onMsg);
    this.auth.get('api/offtop/get_post',this.counter.toString()).subscribe(data=>{
      this.counter++;
      data = data['data'];
      for (let a in data) {
        this.add_post(data[a], false);
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.ws.disconnect();
  }

  post = {
    title:'',
    text:''
  }

  larger(id){
    let a = document.getElementById(id);
    if(a.scrollWidth > a.offsetWidth || a.scrollHeight > a.offsetHeight){
      return true;
    }else return false;
  }
  spoiler(){
    let a = document.getElementById('spoiler');
    let b = document.getElementById('new_post_form');
    if(b.offsetHeight < b.scrollHeight){
      a.style.display = 'none';
      b.style.height = b.scrollHeight + 'px';
    }else {
      a.style.display = 'initial';
      b.style.height = '0px';
    }
  }
  new_post(){
    if(this.post.text && this.post.title){
      this.post.text = this.post.text.split('\n').join('<br>');
      this.ws.send('new_post',{
        'jwt':localStorage.getItem('jwt'),
        'post':this.post
      });
      this.spoiler();
      this.post.text = '';
      this.post.title = '';
    }
  }
  add_post(post,toTop = true){
    if(typeof post == "string"){
      post = JSON.parse(post);
    }
    post =  '<div class="post" id="'+post['id']+'"><div class="post_title"><div class="post_title_block" id="post_title_block">'+post['title']+'</div></div><div class="post_text"><div class="text_container" id="text_container">'+post['text']+'</div></div><div class="post_footer"><div class="post_user"><img class="owners_avatar" src="'+post['avatar']+'" alt="owner">'+post['owner']+'</div><div class="post_date">'+post['date']+'</div></div></div>';
    this.postAdder(post, toTop);
  }
  postAdder(post,top){
    let body = document.getElementById('block');
    if(top){
      body.innerHTML = post + body.innerHTML;
    }
    else body.innerHTML = body.innerHTML + post;
  }
  sign_in(){
    this.data.data['onchange']();
  }
  load:boolean = false;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let a = document.getElementById("loader");
    if(window.scrollY + window.outerHeight > a.offsetTop && !this.load &&  window.outerHeight < a.offsetTop){
      this.load = true;
      this.auth.get('api/offtop/get_post',this.counter.toString()).subscribe(data=>{
        this.counter++;
        data = data['data'];
        for (let a in data) {
          this.add_post(data[a], false);
        }
        this.load = false;
      });
    }
  }
}
