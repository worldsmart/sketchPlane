import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {

  @Input() private outputData: Function;

  constructor() { }

  ngOnInit() {

  }

  private spoilerText:string = null;

  private openSpoiler(id){
    this.close('image_spoiler');
    this.close('video_spoiler');
    document.getElementById(id).style.display = 'flex';
  }
  private addVideoLink(url){
    let a = url.split('/');
    if(a[2] == 'youtu.be'){
      document.getElementById('txt').innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+a[3]+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    else if(a[2] == 'www.youtube.com'){
      let id = a[3].substring(a[3].indexOf('=')+1,a[3].length);
      document.getElementById('txt').innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    else {
      document.getElementById('txt').innerHTML += "<video alt='news-image' class='added-img' src='"+url+"' controls></video>";
    }
    this.close('video_spoiler');
  }
  private addImg(url){
    document.getElementById('txt').innerHTML += "<img alt='news-image' class='added-img' src='"+url+"'>";
    this.close('image_spoiler');
  }
  private newImg(file){
    let type = file.type.split('/')[0];
    let reader = new FileReader();
    reader.onload = (event)=>{
      if(type == 'video'){
        this.addVideoLink(event.target['result']);
      }else if(type == 'image'){
        this.addImg(event.target['result']);
      }
    }
    reader.readAsDataURL(file);
  }
  private close(id){
    document.getElementById(id).style.display = 'none';
    this.spoilerText = '';
  }
  private emmit(innerHTML: string){
    innerHTML = innerHTML.replace('<div>' , '<br>');
    innerHTML = innerHTML.replace('</div>' , '');
    this.outputData(innerHTML);
  }
}
