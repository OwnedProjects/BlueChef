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

  placeOrder(orderDate, hotelId,dtpDelDate, delAddress, contactNo, remarks, orderTakenBy, orderMenu){
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
    return this._http.post(this.server + "assets/db/order.php?action=placeOrder", tmpObj);
  }
  
  getAllOpenOrdersOfHotel(hotelId){
    return this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrdersOfHotel&hotelid="+hotelId);
  }

  getOrderDetails(ordId, hotelId){
    return this._http.get(this.server + "assets/db/order.php?action=getOrderDetails&hotelid="+hotelId+"&orderid="+ordId);
  }

  getOpenOrderDetailsAdmin(ordId){
    return this._http.get(this.server + "assets/db/order.php?action=getOpenOrderDetailsAdmin&orderid="+ordId);
  }
  
  getApprovedOrderDetailsAdmin(ordId){
    return this._http.get(this.server + "assets/db/order.php?action=getApprovedOrderDetailsAdmin&orderid="+ordId);
  }

  getAllOpenOrders(){
    return this._http.get(this.server + "assets/db/order.php?action=getAllOpenOrders");
  }

  approveOrder(oId){
    return this._http.get(this.server + "assets/db/order.php?action=approveOrder&orderId="+oId);
  }

  rejectOrder(oId){
    return this._http.get(this.server + "assets/db/order.php?action=rejectOrder&orderId="+oId);
  }

  getAllPendingOrders(){
    return this._http.get(this.server + "assets/db/order.php?action=getAllPendingOrders");
  }

  out_for_delivery(ordId, ordDt, delMode){
    return this._http.get(this.server + "assets/db/order.php?action=out_for_delivery&orderId="+ordId+"&ordDate="+ordDt+"&delMode="+delMode);
  }

  get_del_modes(){
    return this._http.get(this.server + "assets/db/order.php?action=get_del_modes");
  }

  out_for_delivery_orders(){
    return this._http.get(this.server + "assets/db/order.php?action=out_for_delivery_orders");
  }

  order_delivered(ordId, acptBy){
    return this._http.get(this.server + "assets/db/order.php?action=orderDelivered&orderId="+ordId+"&acceptBy="+acptBy);
  }
}
