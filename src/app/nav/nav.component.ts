import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Input() hidemenu: string;
  showmenu: boolean = true;
  firstname: any;
  userdata: any;
  role: number = -1;

  constructor(private router: Router, private _user: UserService) { }

  ngOnInit() {
    if(this.hidemenu){
      this.showmenu = false;
    }

    if(sessionStorage.getItem("userdata")){
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
      this.firstname = this.userdata[0].first_name;
    }

    let vm = this;
    this._user.getUserRole(this.userdata[0].id)
      .subscribe(respRole => {
        //console.log(respRole);
        if(respRole){
          this.role = respRole["data"][0].role_id;
          if(this.role != 1 && this.role != 2){
            this.router.navigate(["/neworder"]);
          }
        }
        else{
          vm.router.navigate(["/home"]);
        }
        //console.log("Role: ",this.role)
      });
  }

  ngOnDestroy(): void {
    //this.routeSubscribe.unsubscribe();
  }

  logout(){
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("hotel_id");
    this.router.navigate(["/home"]);
  }

}
