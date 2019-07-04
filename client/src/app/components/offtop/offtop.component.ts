import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-offtop',
  templateUrl: './offtop.component.html',
  styleUrls: ['./offtop.component.css']
})
export class OfftopComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  upload(){
    this.auth.pasteData('data',{"date":new Date()}).subscribe(data =>{
      console.log(data);
    });
  }
}
