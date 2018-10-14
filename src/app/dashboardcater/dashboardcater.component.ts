import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-dashboardcater',
  templateUrl: './dashboardcater.component.html',
  styleUrls: ['./dashboardcater.component.css']
})
export class DashboardcaterComponent implements OnInit {
  receivedOrders: any;
  allMenus: any;
  deliveryOut: any;
  pendingDelivery: any;
  topHotels: any;
  topSuppliers: any;

  constructor(private _order: OrderService, private _menu: MenuService) { }

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

    this._menu.getAllMenus().subscribe(response =>{
      if(response){
        console.log("getAllMenus", response);
        this.allMenus = response["data"];
      }
    },
    err => {
      console.log(err);
    });
  }

}
