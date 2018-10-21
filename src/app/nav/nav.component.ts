import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() hidemenu: string;
  showmenu: boolean = true;
  firstname: any;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.hidemenu){
      this.showmenu = false;
    }

    if(sessionStorage.getItem("userdata")){
      this.firstname = JSON.parse(sessionStorage.getItem("userdata"));
      this.firstname = this.firstname[0].first_name;
    }
  }

  logout(){
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("hotel_id");
    this.router.navigate(["/home"]);
  }

}
