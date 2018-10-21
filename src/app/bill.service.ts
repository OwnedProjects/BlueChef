import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  server: any;

  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  addBillDetails(orderDate, amount, orderId){
    let tmpObj = {
      orderDate: orderDate,
      amount: amount,
      oId: orderId
    };
    return this._http.post(this.server + "assets/db/bill.php?action=addBill", tmpObj);
  }

  getBillDetails(ordId){
    return this._http.get(this.server + "assets/db/bill.php?action=getBillDetails&orderId="+ordId);
  }

  getAllBills(){
    return this._http.get(this.server + "assets/db/bill.php?action=getAllBills");
  }

  get_allpay_methods(){
    return this._http.get(this.server + "assets/db/bill.php?action=get_allpay_methods");
  }

  settleCompleteBill(billId, billAmt, payMode, billDt, receivedBy, remarks){
    return this._http.get(this.server + "assets/db/bill.php?action=settleCompleteBill&billId="+billId+"&billAmt="+billAmt+"&payMode="+payMode+"&billDt="+billDt+"&receivedBy="+receivedBy+"&remarks="+remarks);
  }

  settlePartialBill(billId, billAmt, payMode, billDt, receivedBy, remarks){
    return this._http.get(this.server + "assets/db/bill.php?action=settlePartialBill&billId="+billId+"&billAmt="+billAmt+"&payMode="+payMode+"&billDt="+billDt+"&receivedBy="+receivedBy+"&remarks="+remarks);
  }
}
