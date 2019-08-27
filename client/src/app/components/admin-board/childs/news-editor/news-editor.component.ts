import { Component, OnInit } from '@angular/core';
import {state, style, trigger} from '@angular/animations';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css'],
  animations: [
    trigger('viewer', [
      state('initial', style({
      display: 'none'
    })),
      state('shown', style({
        display: 'block'
      })),
      state('selected', style({
        'background-color': 'rgba(58, 67, 81, 0.6)'
      })),
      state('unselected', style({
        'background-color': 'none'
      }))
    ])
  ]
})
export class NewsEditorComponent implements OnInit {

  states = {
    addingTool:'shown',
    delTool:'initial'
  }

  changeMenu(a){
    if(a == 'addingTool' &&  this.states.addingTool != 'shown'){
      this.states.addingTool = 'shown';
      this.states.delTool = 'initial';
    }else if(a == 'delTool' &&  this.states.delTool != 'shown'){
      this.states.delTool = 'shown';
      this.states.addingTool = 'initial';
    }
  }

  constructor() { }

  takeData(word){
    console.log(word);
    document.getElementById('delete').innerHTML = word;
  }

  ngOnInit() {
  }

}
