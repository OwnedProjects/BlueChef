import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlueChef';
  routeSubscribe: Subscription;

  constructor(private router: Router, private _user: UserService){
    let vm = this;
    this.router.events
    .subscribe((val:any)  => {
        if(val instanceof NavigationEnd)
        {
          let url = vm.router.url;
          if(!sessionStorage.getItem("userdata") && vm.router.url != "/home"){
            vm.router.navigate(["/home"]);
          }
          else{
            let userdata = JSON.parse(sessionStorage.getItem("userdata"));
            this._user.getUserRole(userdata[0].id)
              .subscribe(respRole => {
                if(respRole){
                  let role = respRole["data"][0].role_id;
                  //console.log("role", role, url);
                  if(role != "1" && role != "2"){
                    if(url == "/caterdb" || url == "/billing" || url == "/invin" || url == "/invout" || url == "/adduser" || url == "/addproduct" || url == "/addhotel" || url == "/addsupplier" || url == "/addmenu" || url == "/rates"){
                      vm.router.navigate(["/neworder"]);
                    }
                  }
                }
                else{
                  vm.router.navigate(["/home"]);
                }
                //console.log(respRole);
              })
          }
        }
    });
  }
}
