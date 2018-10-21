import { BillService } from './../bill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
  userdata: any;
  hotelId: any;
  billId: any;
  orderDets: any;
  menuDets: any;
  orderId: any;
  approvalError: Boolean = false;
  approvalSuccess: any;
  totalAmt: number = 0;
  orderFlag: number;
  delMode: String;
  deliveryModes: any;

  constructor(private route: ActivatedRoute, private _order: OrderService, private _bill: BillService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("userdata")){
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
      this.hotelId = JSON.parse(sessionStorage.getItem("hotel_id"));
    }

    this.route.params.subscribe(response => {
      this.orderId = response.oId;
      this.orderFlag = parseInt(response.acceptedFlag);
      //AcceptedFlag if 1="openOrder" if 2="PendingOrder"
      console.log("OrderId & AcceptedFlag",response.oId, response.acceptedFlag);
      if(this.orderFlag == 1){
        this._order.getOpenOrderDetailsAdmin(response.oId)
        .subscribe(respOrder => {
          console.log("getApprovedOrderDetailsAdmin ",respOrder);
          this.orderDets = respOrder["data"][0][0];
          this.menuDets = respOrder["data"][1];
          //console.log(this.menuDets);
          for(let i in this.menuDets){
            this.totalAmt += (parseFloat(this.menuDets[i].rate)*parseFloat(this.menuDets[i].quantity))
          }

          this.getBillDets(response.oId);
        },
        err=>{
          console.log("getApprovedOrderDetailsAdmin ", err);
        })
      }
      else{
        this._order.getApprovedOrderDetailsAdmin(response.oId)
        .subscribe(respOrder => {
          console.log("getApprovedOrderDetailsAdmin ",respOrder);
          this.orderDets = respOrder["data"][0][0];
          this.menuDets = respOrder["data"][1];
          //console.log(this.menuDets);
          for(let i in this.menuDets){
            this.totalAmt += (parseFloat(this.menuDets[i].rate)*parseFloat(this.menuDets[i].quantity))
          }

          this.getBillDets(response.oId);
          this.get_del_modes();
        },
        err=>{
          console.log("getApprovedOrderDetailsAdmin ", err);
        })
      }
    });
  }

  getBillDets(oId){
    //console.log("OID", oId)
    this._bill.getBillDetails(oId)
    .subscribe(respBill => {
      console.log("getBillDetails", respBill);
      this.billId = respBill["billID"];
    },
    errBill => {
      console.log("getBillDetails", errBill);
    });
  }

  approve_request(){
    //console.log("Test", this.orderId);
    let vm = this;
    this._order.approveOrder(this.orderId)
      .subscribe(response => {
        console.log("ApproveOrder", response);
        if(response){
          if(response["data"] == "success"){
            this.approvalSuccess = "Order successfully approved.";
            this.approvalError = false;
          }
          else{
            this.approvalError = true;
            this.approvalSuccess = null;
          }
          const source = interval(3000);
          const timer$ = timer(6000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x)
            vm.router.navigate(["/caterdb"]);
          });
        }
      },
      error => {
        console.log("Error", error);
        this.approvalError = true;
        this.approvalSuccess = null;
      });
  }

  reject_request(){
    let vm = this;
    this._order.rejectOrder(this.orderId)
      .subscribe(response => {
        console.log("RejectOrder", response);
        if(response){
          if(response["data"] == "success"){
            this.approvalSuccess = "Order is successfully rejected";
            this.approvalError = false;
          }
          else{
            this.approvalError = true;
            this.approvalSuccess = null;
          }
          const source = interval(3000);
          const timer$ = timer(6000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x)
            vm.router.navigate(["/caterdb"]);
          });
        }
      },
      error => {
        console.log("Error", error);
        this.approvalError = true;
        this.approvalSuccess = null;
      });
  }

  out_for_delivery(){
    console.log("Out For Delivery");
    let dt = new Date().getTime();
    this._order.out_for_delivery(this.orderId, dt, this.delMode)
      .subscribe(response => {
        console.log("out_for_delivery",response)
        if(response){
          if(response["data"]=="success"){
            this.approvalSuccess = "Order is out for delivery";
            this.approvalError = false;
          }
          else{
            this.approvalSuccess = false;
            this.approvalError = true;
          }
        }
        else{
          this.approvalSuccess = false;
          this.approvalError = true;
        }
        let vm = this;
        const source = interval(3000);
          const timer$ = timer(6000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x)
            vm.router.navigate(["/caterdb"]);
          });
      },
      error => {
        console.log("out_for_delivery",error);
      })
  }

  get_del_modes(){
    this._order.get_del_modes()
      .subscribe(response => {
        console.log("get_del_modes", response);
        if(response){
          this.deliveryModes = response["data"];
        }
      },
      err => {
        console.log("get_del_modes", err);
      });
  }
}