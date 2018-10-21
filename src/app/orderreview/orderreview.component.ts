import { BillService } from './../bill.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orderreview',
  templateUrl: './orderreview.component.html',
  styleUrls: ['./orderreview.component.css']
})
export class OrderreviewComponent implements OnInit {
  ordId: any;
  billDets: any;
  orderDets: any;
  hotelId: String;
  totalAmt: number = 0;

  constructor(private _order: OrderService, private route: ActivatedRoute, private _bill: BillService) { }

  ngOnInit() {
    const source = interval(1000);
    const timer$ = timer(2000);
    this.route.params.subscribe(response => {

      if(sessionStorage.getItem("hotel_id")){
        this.hotelId = JSON.parse(sessionStorage.getItem("hotel_id"));
      }

      this.ordId = response.oId;
      let vm = this;
      source.pipe(
        map((x) => {
          return x;
        }),
        takeUntil(timer$)
      ).subscribe(x => {
        console.log("Timer", x)
        
        vm._bill.getBillDetails(this.ordId)
        .subscribe(respBill => {
          console.log("Bill Details", respBill);
          vm.billDets = respBill;
          vm.get_order_dets();
        },
        error => {
          console.log("Bill Error", error);
        });
      });
    });
  }

  get_order_dets(){
    console.log(this.ordId, this.hotelId);    
    this._order.getOrderDetails(this.ordId, this.hotelId)
      .subscribe(response => {
        //console.log("get_order_dets", response["data"]);
        this.orderDets = response["data"][1];
        for(let i in this.orderDets){
          console.log(this.orderDets[i].rate * this.orderDets[i].quantity);
          this.totalAmt += this.orderDets[i].rate * this.orderDets[i].quantity;
        }
      },
      err => {
        console.log("get_order_dets", err);
      })
  }
}
