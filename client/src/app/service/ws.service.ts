import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }
  private ws = undefined;
  connection_status:boolean = false;
  error = undefined;
  connect(onMsg){
    let websocket = new WebSocket('ws://localhost:3228/api/offtop/echo');
    websocket.onopen = ()=>{
      websocket.onmessage = onMsg;
      this.ws = websocket;
      this.connection_status = true;
    }
    websocket.onclose = ()=>{
      this.connection_status = false;
      this.ws = websocket;
      this.auto_reconnect(onMsg);
    }
    websocket.onerror = (error)=>{
      this.error = error;
      this.connection_status = false;
    };
  }
private lock:boolean = false;
  disconnect(){
    if(this.ws){
      this.ws.close();
      this.lock = true;
    }
  }

  send(type,data){
      this.loop(()=>{
        this.ws.send(JSON.stringify({
          'type':type,
          'data':data
        }));
      });
  }

  private auto_reconnect(ms){
        setTimeout(()=>{
          if(this.ws && !this.lock){
          if(this.ws)this.ws.close();
          this.connect(ms);
          }else this.lock = false;
        },3000);
  }

  private loop(data){
    if(!this.ws || this.ws['readyState'] != 1){
      setTimeout(()=>{
        this.loop(data);
      }, 90);
    } else data();
  }
}
