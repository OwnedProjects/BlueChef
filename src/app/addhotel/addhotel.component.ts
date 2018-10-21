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
  hid: String = null;
  uid: String = null;
  editHotel: number = -1;
  user_list: any;
  dtpDelDate: String = null;
  hotel_list: any;
  userdata: any;
  successFlag: String = null;
  errorFlag: String = null;
  constructor(private _hotelService: HotelService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._hotelService.getUsers().subscribe(response => {
      this.user_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });

    this.getProduct();
  }

  getProduct() {
    this._hotelService.getUserHotel().subscribe(response => {
      this.hotel_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }

  addHotel() {
    this._hotelService.addHotel(this.hname, this.hadd, this.hcont, this.hno, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getProduct();
          this.successFlag = "Hotel added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Hotel cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
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
          this.getProduct();
        }
        else {
          alert("Can not deactivate hotel.Please try again later")
        }
      },
        error => {
          console.log(error);

        })


  }
  edit_Hotel(index, hid, uid) {
    this.hid = hid;
    this.uid = uid;
    this.editHotel = index + 1;
    this.hname = this.hotel_list[index].name;
    this.hadd = this.hotel_list[index].address;
    this.hno = this.hotel_list[index].cont_no;
    this.hcont = this.uid + '.' + this.hotel_list[index].user_name;
    window.scroll(0, 0);
  }

  cancel_edit_Hotel() {
    this.hadd = null;
    this.hname = null;
    this.hno = null;
    this.hcont = null;
    this.editHotel = -1;
  }
  editHotelSave() {
    this._hotelService.edithotel(this.hid, this.hname, this.hadd, this.hno, this.hcont, this.userdata[0].id)
      .subscribe(response => {
        console.log(response);
        this.editHotel = -1;
        if (response["status"] == 200) {
          this.getProduct();
          this.successFlag = "Hotel edited successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Hotel cannot be edited now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          //console.log(error);

        })
    //reset fields
    this.hname = this.hadd = this.hno = this.hcont = null;

  }
}
