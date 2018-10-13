import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from './../hotel.service';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css']
})
export class AddHotelComponent implements OnInit {
  hname: String = null;
  hadd: String = null;
  hcont: String = null;
  hno: String = null;
  user_list: any;
  dtpDelDate: String = null;
  hotel_list: any;
  userdata: any;
  successFlag: String = null;
  errorFlag: String = null;
  searchInput: string;

  constructor(private _hotelService: HotelService, private router: Router) {

  }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    
    this.getUsers();
    this.getHotelsList();
  }

  getHotelsList() {
    this._hotelService.getUserHotel().subscribe(response => {
      this.hotel_list = response["data"];
    },  err => {
      console.log("Error:", err);
    });
  }

  getUsers() {
    this._hotelService.getUsers().subscribe(response => {
      this.user_list = response["data"];
    }, err => {
      console.log("Error:", err);
    });
  }

  
  addHotel() {
    this._hotelService.addHotel(this.hname, this.hadd, this.hcont, this.hno, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] === 200) {
        this.getHotelsList();
          this.successFlag = "Hotel added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 5000);
        } else {
          this.errorFlag = "Hotel cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 5000);
        }
      }, error => {
          console.log(error);
      });
    // reset fields
    this.hname = this.hadd = this.hcont = this.hno = null;
  }

  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  toggleHotel(id, action) {
    this._hotelService.toggleHotel(id, action, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getHotelsList();
        } else {
          alert("Can not deactivate hotel.Please try again later")
        }
      },  error => {
          console.log(error);
    });
  }
}
