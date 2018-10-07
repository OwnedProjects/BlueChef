import { Router } from '@angular/router';
import { HotelService } from './../hotel.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {
  all_menus: any;
  menuError: String = null;
  qtyError: Boolean = true;
  dateError: Boolean = false;
  editOrder: number = -1;
  menunm: String= null;
  quantity: any= null;
  totalAmount: number = 0;
  order_menu: any = new Array();
  hotelID: String = null;
  dtpDelDate: String = null;
  delAddress: String = null;
  orderTakenBy: String = null;
  contactNo: String = null;
  remarks: String = null;
  openOrders: any;
  orderPresent: any;
  userData: any;

  constructor(private _order: OrderService, private _menu: MenuService, private _hotel: HotelService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("newOrder")){
      this.orderPresent = JSON.parse(sessionStorage.getItem("newOrder"));  
      if(this.orderPresent.restore == "Yes"){
        this.view_order();
        this.orderPresent.restore = "No";
        sessionStorage.setItem("newOrder", JSON.stringify(this.orderPresent));
      }
    }

    if(sessionStorage.getItem("userdata")){
      this.userData = JSON.parse(sessionStorage.getItem("userdata"));
      //console.log("User Data: ", this.userData);
    }

    this._hotel.getUserHotel(this.userData[0].id).subscribe(res =>{
      console.log("Init Hotel: ",res);
      if(res){
        sessionStorage.setItem("hotel_id", res["data"][0].id)
        this.hotelID = res["data"][0].id;
        this.delAddress = res["data"][0].address;
        this.orderTakenBy = res["data"][0].contact_person;
        this.contactNo = res["data"][0].contact_number;
        this.get_all_menus();
        this.get_all_orders();
      }
    });

    var dt = new Date();
    if(dt.getDate()<10 && (dt.getMonth()+1)<10){
      this.dtpDelDate = "0"+dt.getDate() + "/0" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    else if(dt.getDate()<10){
      this.dtpDelDate = "0"+dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    else{
      this.dtpDelDate = dt.getDate() + "/0" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    //this.dtpDelDate = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear()
    
  }

  add_menu(){
    //console.log(this.menunm, this.quantity);
    let tmpOrder: any = {
      "menuid": parseFloat(this.menunm.split(".")[0]),
      "name": this.menunm.split(".")[1],
      "rate": parseFloat(this.menunm.split(".")[2]),
      "qty": parseFloat(this.quantity),
      "amount": parseFloat(this.quantity) * parseFloat(this.menunm.split(".")[2])
    };

    this.order_menu.push(tmpOrder);
    this.calc_total_order_amount();
    this.menunm= null;
    this.quantity= null;
  }

  check_menu_name(){
    let flag: Boolean = false;
    if(this.menunm){
      for(let i in this.all_menus){
        //console.log(this.menunm.split(".")[1], this.all_menus[i].name)
        if(this.menunm.split(".")[1] == this.all_menus[i].name){
          flag = true;
          break;
        }
      }
      if(flag == true){
        this.menuError = null;
      }
      else{
        this.menuError = "Invalid menu";
      }
    }
    return flag;
  }

  calc_total_order_amount(){
    let totamount = 0;
    if(this.order_menu.length>0){
      for(let i in this.order_menu){
        totamount += this.order_menu[i].amount;
      }
      this.totalAmount = totamount;
    }
    else{
      this.totalAmount = 0;
    }
  }

  remove_ordermenu(index){
    this.order_menu.splice(index,1);
    this.calc_total_order_amount();
  }

  edit_ordermenu(index){
    this.editOrder = index;
    this.menunm = this.order_menu[index].name;
    this.quantity = this.order_menu[index].qty;
  }

  save_editOrder(){
    this.order_menu[this.editOrder].qty = this.quantity;
    this.order_menu[this.editOrder].amount = this.order_menu[this.editOrder].rate * this.quantity;
    this.calc_total_order_amount();
    this.cancel_editOrder();
  }

  cancel_editOrder(){
    this.menunm = null;
    this.quantity = null;
    this.editOrder = -1;
  }

  place_order(){
    console.log(this.dtpDelDate, this.delAddress, this.contactNo, this.remarks, this.orderTakenBy);
    let dt = new Date();
    let deldt = new Date();
    deldt.setDate(parseInt(this.dtpDelDate.split("/")[0]));
    deldt.setMonth(parseInt(this.dtpDelDate.split("/")[1])-1);
    deldt.setFullYear(parseInt(this.dtpDelDate.split("/")[2]));
    let newOrder = {
      orderDate: dt.getTime(),
      hotelID: this.hotelID,
      dtpDelDate: deldt.getTime(),
      delAddress: this.delAddress,
      contactNo: this.contactNo,
      remarks: this.remarks,
      orderTakenBy: this.orderTakenBy,
      orderMenu: this.order_menu,
      restore: 'No'
    };
    // this._order.placeOrer(this.hotelID,this.dtpDelDate, this.delAddress, this.contactNo, this.remarks, this.orderTakenBy,this.order_menu)
    //   .subscribe(response => {
    //     console.log(response);
    //   });
    sessionStorage.setItem("newOrder", JSON.stringify(newOrder));
    this.router.navigate(["/conforder"]);
  }

  get_all_orders(){
    this._order.getAllOpenOrdersOfHotel(this.hotelID)
      .subscribe(response => {
        console.log("get_all_orders: ",response);
        if(response){
          this.openOrders = response["data"];
        }
      })
  }

  get_all_menus(){
    this._menu.getAllMenus(this.hotelID).subscribe(response => {
      console.log("getAllMenus: ",response);
      if(response){
        this.all_menus = response["data"];
      }
    },
    err => {
      console.log("getAllMenus Error:", err);
    });
  }

  validate_number(){
    if(this.quantity){
      let pattern = /^\d*$/;
      this.qtyError = pattern.test(this.quantity);
    }
  }

  view_order(){
    //console.log(this.orderPresent.dtpDelDate);
    debugger;
    let dt = new Date();
    dt.setTime(this.orderPresent.dtpDelDate);
    //console.log(dt.getDate(), dt.getMonth(), dt.getFullYear());
    
    if(dt.getDate()<10 && (dt.getMonth()+1)<10){
      //console.log("A1");
      this.dtpDelDate = "0"+ dt.getDate() + "/0" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    else if(dt.getDate()<10){
      //console.log("A2");
      this.dtpDelDate = "0"+dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    else if((dt.getMonth()+1)<10){
      //console.log("A3");
      this.dtpDelDate = dt.getDate() + "/0" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    else{
      //console.log("A4")
      this.dtpDelDate = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();
    }
    
    this.delAddress= this.orderPresent.delAddress,
    this.contactNo= this.orderPresent.contactNo,
    this.remarks= this.orderPresent.remarks,
    this.orderTakenBy= this.orderPresent.orderTakenBy,
    this.order_menu = this.orderPresent.orderMenu;
    this.calc_total_order_amount();
  }

  remove_order(){
    sessionStorage.removeItem("newOrder");
    window.location.reload();
  }

  validate_date(){
    let flag = false;
    if(this.dtpDelDate == null || this.dtpDelDate == undefined || this.dtpDelDate == ""){
      return;
    }
    if(this.dtpDelDate.split("/").length != 3){
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let dt = parseInt(this.dtpDelDate.split("/")[0]);
    let mnth = parseInt(this.dtpDelDate.split("/")[1])-1;
    let year = parseInt(this.dtpDelDate.split("/")[2]);
    if(dt == NaN || mnth == NaN || year == NaN || year <= 2000){
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let febDays = 28;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      febDays = 29;
    }

    switch(mnth) {
      case 0:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 1:
        if(!(dt >= 1 && dt <= febDays)){
          flag = true;
        }
        break;
      case 2:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 3:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 4:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 5:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 6:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 7:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 8:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 9:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 10:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 11:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      default:
        flag = true;
    }
    this.dateError = flag;
    return flag;
  }
}