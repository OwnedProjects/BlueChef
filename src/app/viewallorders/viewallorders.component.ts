import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewallorders',
  templateUrl: './viewallorders.component.html',
  styleUrls: ['./viewallorders.component.css']
})
export class ViewallordersComponent implements OnInit {
  receivedOrders: any;

  constructor(private _order: OrderService) { }

  ngOnInit() {
    this._order.getAllOpenOrders().subscribe(response => {
      console.log("getAllOpenOrders: ", response);
      if(response){
        this.receivedOrders = response["data"];
      }
    },
    err =>{
      console.log(err);
    });
  }

}
