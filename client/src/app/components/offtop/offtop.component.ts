import {Component, OnInit} from '@angular/core';
import {WsService} from "../../service/ws.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-offtop',
  templateUrl: './offtop.component.html',
  styleUrls: ['./offtop.component.css']
})
export class OfftopComponent implements OnInit{

  constructor(private ws:WsService, private auth:AuthService) {
    this.ws.connect();
    this.ws.onmessage((res)=>{
      document.getElementById('block').innerHTML += '<div>' + res.data + '</div>';
    });
  }

  ngOnInit() {

  }
  text:string;
  click(){
    this.ws.send('msg',{
      'type':'post',
      'name':this.auth.user['name'],
      'text':this.text
    });
    this.text = '';
  }
}
