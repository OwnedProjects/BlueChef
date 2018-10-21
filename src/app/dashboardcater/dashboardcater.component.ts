import { HotelService } from './../hotel.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-dashboardcater',
  templateUrl: './dashboardcater.component.html',
  styleUrls: ['./dashboardcater.component.css']
})
export class DashboardcaterComponent implements OnInit {
  receivedOrders: any;
  allMenus: any;
  deliveryOut: any;
  pendingDeliveries: any;
  topHotels: any;
  topSuppliers: any;
  searchMenuInput: String;
  searchSupplierInput: String;
  searchHotelInput: String;

  constructor(private _order: OrderService, private _menu: MenuService, private _supplier: SupplierService, private _hotel:HotelService) { }

  ngOnInit() {
    // const source = interval(1000);
    // const timer$ = timer(2000);
    // let vm = this;
    // source.pipe(
    //   map((x) => {
    //     return x;
    //    }),
    //    takeUntil(timer$)
    // ).subscribe(x => {
    //   console.log("Timer", x)
    //   vm._order.getAllOpenOrders().subscribe(response => {
    //     console.log("getAllOpenOrders: ", response);
    //     vm.receivedOrders = response["data"];
    //   },
    //   err =>{
    //     console.log(err);
    //   });
    // });

    //Pending Orders
    this._order.getAllOpenOrders().subscribe(response => {
      console.log("getAllOpenOrders: ", response);
      if(response){
      this.receivedOrders = response["data"];
      }
    },
    err =>{
      console.log(err);
    });

    //All Menus
    this._menu.getAllMenus().subscribe(response =>{
      if(response){
        console.log("getAllMenus", response);
        this.allMenus = response["data"];
      }
    },
    err => {
      console.log(err);
    });

    //All Suppliers
    this._supplier.getSuppliers().subscribe(response =>{
      if(response){
        console.log("getSuppliers", response);
        this.topSuppliers = response["data"];
      }
    },
    err => {
      console.log(err);
    });

    //All Hotels
    this._hotel.getAllHotels().subscribe(response =>{
      if(response){
        console.log("getAllHotels", response);
        this.topHotels = response["data"];
      }
    },
    err => {
      console.log(err);
    });

    //Pending Orders
    this._order.getAllPendingOrders().subscribe(response =>{
      if(response){
        console.log("getAllPendingOrders", response);
        this.pendingDeliveries = response["data"];
      }
    },
    err => {
      console.log(err);
    });

    
    //Out For Delivery Orders
    this._order.out_for_delivery_orders().subscribe(response =>{
      if(response){
        console.log("out_for_delivery_orders", response);
        this.deliveryOut = response["data"];
      }
    },
    err => {
      console.log(err);
    });
  }

}
