import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit {
  uname: String = null;
  fname: String = null;
  lname: String = null;
  passwd: String = null;
  cont: String = null;
  role: String = null;
  role_list: any;
  userdata: any;
  successFlag: String = null;
  errorFlag: String = null;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._userService.getRoles().subscribe(response => {
      this.role_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });


  }

  addUser() {
    //if(this.usernm && this.passwd){
    this._userService.addUser(this.uname, this.fname, this.lname, this.passwd, this.cont, this.role, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.successFlag = "User added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "User cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
      error => {
        //console.log(error);

      })
    //reset fields
    this.uname = this.fname = this.lname = this.passwd = this.cont = this.role = null;
    //}
    //else{
    //  this.errorMessage = "*Username or Password cannot be blank."
    //}
  }
  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
