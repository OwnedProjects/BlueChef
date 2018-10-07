import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() hidemenu: string;
  showmenu: boolean = true;
  
  constructor() { }

  ngOnInit() {
    if(this.hidemenu){
      this.showmenu = false;
    }
  }

}
