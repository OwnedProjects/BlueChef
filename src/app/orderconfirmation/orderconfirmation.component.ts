import { OrderService } from './../order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent implements OnInit {
  orderPresent: any; 
  totalAmount: number = 0;
  errorFlag: boolean= false;
  constructor(private router: Router, private _order: OrderService) { }

  ngOnInit() {
    if(sessionStorage.getItem("newOrder")){
      this.orderPresent = JSON.parse(sessionStorage.getItem("newOrder"));
    }
    else{
      this.router.navigate(["/neworder"]);
    }

    for(var i=0; i<this.orderPresent.orderMenu.length; i++){
      this.totalAmount += parseFloat(this.orderPresent.orderMenu[i].amount);
    }
  }

  change_order(){
    this.orderPresent.restore = "Yes";
    sessionStorage.setItem("newOrder", JSON.stringify(this.orderPresent));
    this.router.navigate(["/neworder"]);
  }

  confirm_order(){
    console.log(this.orderPresent)
    this._order.placeOrer(this.orderPresent.orderDate, this.orderPresent.hotelID,this.orderPresent.dtpDelDate, this.orderPresent.delAddress, this.orderPresent.contactNo, this.orderPresent.remarks, this.orderPresent.orderTakenBy, this.orderPresent.orderMenu)
      .subscribe(response => {
        console.log("conf order: ",response);
        sessionStorage.removeItem("newOrder");
        this.router.navigate(["/revieworder/"+ response["data"]]);
      },
      err =>{
        console.log(err);
        this.errorFlag = true;
      });
  }
}
