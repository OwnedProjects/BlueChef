import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-viewalloutdel',
  templateUrl: './viewalloutdel.component.html',
  styleUrls: ['./viewalloutdel.component.css']
})
export class ViewalloutdelComponent implements OnInit {
  deliveryOut: any;
  orderSuccess: Boolean = false;

  constructor(private _order: OrderService) { }

  ngOnInit() {   
    this.get_orders();
  }

  order_delivered(index){
    console.log(index, this.deliveryOut[index].contact_person);
    this._order.order_delivered(this.deliveryOut[index].id, this.deliveryOut[index].contact_person)
      .subscribe(response => {
        if(response){
          let vm = this;
          this.orderSuccess = true;
          const source = interval(2000);
          const timer$ = timer(4000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x);
            vm.get_orders();
            vm.orderSuccess = false;
          });
        }
        else{
          alert("Some error occurred, please try again later.");
        }
      },
      err => {
        console.log("order_del", err);
      })
  }
  
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  get_orders(){
    this._order.out_for_delivery_orders().subscribe(response =>{
      if(response){
        console.log("out_for_delivery_orders", response);
        this.deliveryOut = response["data"];
      }
      else{
        this.deliveryOut = null;
      }
    },
    err => {
      console.log(err);
    });
  }
}
