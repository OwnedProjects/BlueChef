import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Variable declaration
  errorMessage: String = null;
  usernm: String = null;
  passwd: String = null;
  

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    console.log("Home Loaded")
  }

  checkLogin(){
    //this.router.navigate(["/caterdb"]);
    //return;
    if(this.usernm && this.passwd){
      console.log("Test", this.usernm, this.passwd);
      this.errorMessage = null;
      this._loginService.validateLogin(this.usernm, this.passwd)
        .subscribe(response => {
          console.log("Response", response);
          sessionStorage.setItem("userdata", JSON.stringify(response["data"]));
          if(response["status"]==200){
            this.router.navigate(["/caterdb"]);
          }
          else{
            this.errorMessage = "*Invalid credentials, try again."
          }
        },
        error => {
          console.log(error);
          this.errorMessage = error.message;
        })
      //reset fields
      this.usernm = this.passwd = null;
    }
    else{
      this.errorMessage = "*Username or Password cannot be blank."
    }
  }

}