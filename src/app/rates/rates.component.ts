import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from './../hotel.service';
import { MenuService } from './../menu.service';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  constructor(private _rateService: RateService,private _hotelService: HotelService,private _menuService: MenuService,private router: Router) { }
  userdata: any;
  hotel_list: any;
  menu_list: any;
  hname: any;
  mname: any;
  rate: any;

  successFlag: String = null;
  errorFlag: String = null;

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    
    this.getHotelList();
    this.getMenus();

  }

  getHotelList() {
    this._hotelService.getUserHotel().subscribe(response => {
      if (response["status"] === 200) {
        this.hotel_list = response["data"];
      }
    }, err => {
      console.log("Error:", err);
    });
  }

  getMenus() {
    this._menuService.getMenuList().subscribe(response => {
      if (response["status"] === 200) {
        this.menu_list = response["data"];
      }
    },  err => {
      console.log("Error:", err);
    });
  }

  addRate() {
    this._rateService.addRate(this.hname, this.mname, this.rate, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] === 200) {
          this.successFlag = "Rate added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);
        }  else {
          this.errorFlag = "Rate cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      }, error => {
          console.log(error);
        });
    // reset fields
    this.mname = this.mname = null;
  }

  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
