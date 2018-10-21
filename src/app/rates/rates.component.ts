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

  constructor(private _rateService: RateService, private _hotelService: HotelService, private _menuService: MenuService, private router: Router) { }
  userdata: any;
  hotel_list: any;
  menu_list: any;
  hotel_rate_list: any;
  hname: any;
  mname: any;
  rate: any;
  rhname: any;
  isdisable: Boolean = false;
  mid: String = null;
  hid: String = null;
  rid: String = null;
  editrate: number = -1;


  successFlag: String = null;
  errorFlag: String = null;

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._hotelService.getUserHotel().subscribe(response => {
      this.hotel_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
    this._menuService.getMenuList().subscribe(response => {
      this.menu_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });


  }

  addRate() {
    this._rateService.addRate(this.hname, this.mname, this.rate, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.successFlag = "Rate added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);
        }
        else {
          this.errorFlag = "Rate cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.hname = this.mname = this.rate = null;
  }
  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getHotelrates() {
    this._rateService.getHotelRate(this.rhname).subscribe(response => {
      console.log(response);
      this.hotel_rate_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }

  toggleRate(id, action) {
    this._rateService.toggleHotelRate(id, action, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getHotelrates();
        }
        else {
          alert("Can not deactivate hotel.Please try again later")
        }
      },
        error => {
          console.log(error);

        })
  }

  edit_rate(index, rid, hid, mid) {
    this.hid = hid;
    this.mid = mid;
    this.rid = rid;
    this.editrate = index + 1;
    this.hname = this.hid + '.' + this.hotel_rate_list[index].hname;
    this.mname = this.mid + '.' + this.hotel_rate_list[index].mname;
    this.rate = this.mid + '.' + this.hotel_rate_list[index].rate;
    this.rate = this.hotel_rate_list[index].rate;
    this.isdisable = true;
    window.scroll(0, 0);
  }

  cancel_edit_rate() {
    this.hname = null;
    this.mname = null;
    this.rate = null;
    this.isdisable = false;
    this.editrate = -1;
  }

  editRateSave() {
    this._rateService.editRate(this.rate, this.rid, this.userdata[0].id)
      .subscribe(response => {
        console.log(response);
        this.editrate = -1;
        this.isdisable = false;
        if (response["status"] == 200) {
          this.getHotelrates();
          this.successFlag = "Rate edited successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Rate cannot be edited now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.hname = this.mname = this.rate = null;

  }
}
