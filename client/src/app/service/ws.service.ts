import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }
  private ws = undefined;
  connection_status:boolean = false;
  error = undefined;
  connect(){
    let websocket = new WebSocket('ws://localhost:3228/api/offtop/echo');
    websocket.onopen = ()=>{
      this.ws = websocket;
      this.connection_status = true;
    }
    websocket.onclose = ()=>{
      this.connection_status = false;
      this.ws = websocket;
      this.auto_reconnect();
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

  send(name,data){
      this.loop(()=>{
        this.ws.send(JSON.stringify({
          'name':name,
          'data':data
        }));
      });
  }
  onmessage(cb){
    this.loop(()=>{
      this.ws.onmessage = cb;
    });
  }
  private auto_reconnect(){
        setTimeout(()=>{
          if(this.ws && !this.lock){
          if(this.ws)this.ws.close();
          this.connect();
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
