import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddMenuComponent implements OnInit {
  mname:string;
  type:string;
  index:number;
  allmenus:any[]=new Array();
  constructor() { }

  ngOnInit() {
  }
 
}
