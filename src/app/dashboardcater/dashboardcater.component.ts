import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboardcater',
  templateUrl: './dashboardcater.component.html',
  styleUrls: ['./dashboardcater.component.css']
})
export class DashboardcaterComponent implements OnInit {
  receivedOrders: any;

  constructor(private _order: OrderService) { }

  //async ngOnInit() { for synchronizing

  ngOnInit() {
    const source = interval(15000);
    //const timer$ = timer(150000);
    let vm = this;
    vm._order.getAllOpenOrders().subscribe(response => {
      console.log("getAllOpenOrders: ", response);
      vm.receivedOrders = response["data"];
    },
    err =>{
      console.log(err);
    });

    /*source.pipe(
      map((x) => {
        return x;
       }),
       //takeUntil(timer$)
    ).subscribe(x => {
      console.log("Test", x)
      if(x==10){
        window.location.reload();
      }
      vm._order.getAllOpenOrders().subscribe(response => {
        console.log("getAllOpenOrders: ", response);
        vm.receivedOrders = response["data"];
      },
      err =>{
        console.log(err);
      });
    });*/
    
    // This code was written for syncing  
    // let test = await this._order.getAllOpenOrders();
    // console.log(test.data);
    // this.receivedOrders = test.data;
  }

}
