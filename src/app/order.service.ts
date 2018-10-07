import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  server: any;
  
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  placeOrer(orderDate, hotelId,dtpDelDate, delAddress, contactNo, remarks, orderTakenBy, orderMenu){
    let tmpObj = {
      orderDate: orderDate,
      hotelId: hotelId,
      dtpDelDate: dtpDelDate,
      delAddress: delAddress,
      contactNo: contactNo,
      remarks: remarks,
      orderTakenBy: orderTakenBy,
      orderMenu: orderMenu
    };
    console.log("place order");
    
    return this._http.post(this.server + "assets/db/order.php?action=placeOrder", tmpObj);
  }
  
  getAllOpenOrdersOfHotel(hotelId){
    return this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrdersOfHotel&hotelid="+hotelId);
  }

  getOrderDetails(ordId, hotelId){
    return this._http.get(this.server + "assets/db/order.php?action=getOrderDetails&hotelid="+hotelId+"&orderid="+ordId);
  }

  // This is for sync
  // async getAllOpenOrders(): Promise<any>{
  //   //return this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrders");
  //   const response = await this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrders").toPromise();
  //   return response;
  // }
  
  getAllOpenOrders(){
    return this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrders");
  }

}
