import { BillService } from './../bill.service';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  allBills: any;
  billDets: any;
  billAmt: any;
  payDate: String;
  inputAmt: String;
  inputPayMethod: String;
  payAllMethods: any;
  billSuccess: String = null;
  remarks: String = null;
  receivedBy: any;
  dateError: Boolean = false;
  showAccWrapper: number = -1;

  constructor(private _bill: BillService) { }

  ngOnInit() {
    this.get_all_bills();
    this.get_allpay_methods();
    if(sessionStorage.getItem("userdata")){
      this.receivedBy = JSON.parse(sessionStorage.getItem("userdata"));
      this.receivedBy = this.receivedBy[0].first_name;
    }
  }

  get_allpay_methods(){
    this._bill.get_allpay_methods().subscribe(response => {
      console.log("get_allpay_methods", response);
      if(response){
        this.payAllMethods = response["data"];
      }
    },
    err => {
      console.log("get_allpay_methods", err);
    });
  }

  get_all_bills(){
    this._bill.getAllBills().subscribe(response => {
      console.log("getAllBills", response);
      if(response){
        this.allBills = response["data"];
        for(let i in this.allBills){
          this.allBills[i].accDets = new Array();
          this.allBills[i].amtRem = this.allBills[i].amount;
        }

        let accDets = response["dataAcc"];
        for(let j in accDets){
          for(let k in this.allBills){
            if(accDets[j].bill_id == this.allBills[k].id){
              this.allBills[k].accDets.push(accDets[j]);
              break;
            }
          }
        }

        for(let i in this.allBills){
          let amtRem = 0;
          for(let j in this.allBills[i].accDets){
            amtRem += parseFloat(this.allBills[i].accDets[j].amount);
          }
          this.allBills[i].amtRem = parseFloat(this.allBills[i].amount)-amtRem;
        }
        console.log(this.allBills);
      }
    },
    err => {
      console.log("getAllBills err",err)
    });
  }

  payBill(bill){
    //console.log(bill);
    this._bill.getBillDetails(bill.order_id).subscribe(resp => {
      console.log("getBillDetails", resp);
      this.billDets = resp;
      this.billAmt=bill;
    },
    err => {
      console.log(err);
    });
  }

  settle_bill(){
    if(this.billAmt.amtRem == this.inputAmt){
      console.log("Settle COMPLETE Bill");
      let dt = new Date();
      dt.setDate(parseInt(this.payDate.split("-")[0]));
      dt.setMonth(parseInt(this.payDate.split("-")[1])-1);
      dt.setFullYear(parseInt(this.payDate.split("-")[2]));
      this._bill.settleCompleteBill(this.billDets.billID, this.inputAmt, this.inputPayMethod, dt.getTime(), this.receivedBy, this.remarks).subscribe(response => {
        console.log("settleCompleteBill", response);
        if(response){
          this.billSuccess = "Bill is settled successfully";
          this.billDets = null;
          this.billAmt = null;
          this.inputPayMethod = null;
          this.remarks = null;
          this.payDate = null;
          this.inputAmt = null;
          this.get_all_bills();
          let vm = this;
          const source = interval(2000);
          const timer$ = timer(4000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x);
            vm.billSuccess = null;
          });
        }
        else{
          alert("Bill cannot be settled, try again later.");
        }
      },
      err => {
        console.log("Settle COMPLETE Bill",err);
        alert("Bill cannot be settled, try again later.");
      });
    }
    else{
      console.log("Settle PARTIAL bill");
      let dt = new Date();
      dt.setDate(parseInt(this.payDate.split("-")[0]));
      dt.setMonth(parseInt(this.payDate.split("-")[1])-1);
      dt.setFullYear(parseInt(this.payDate.split("-")[2]));
       
      this._bill.settlePartialBill(this.billDets.billID, this.inputAmt, this.inputPayMethod, dt.getTime(), this.receivedBy, this.remarks)
      .subscribe(response => {
        console.log("settlePartialBill", response);
        if(response){
          this.billSuccess = "Bill is partially settled";
          this.billDets = null;
          this.billAmt = null;
          this.inputPayMethod = null;
          this.remarks = null;
          this.payDate = null;
          this.inputAmt = null;
          this.get_all_bills();
          let vm = this;
          const source = interval(2000);
          const timer$ = timer(4000);
          source.pipe(
            map((x) => {
              return x;
             }),
             takeUntil(timer$)
          ).subscribe(x => {
            console.log("Timer", x);
            vm.billSuccess = null;
          });
        }
        else{
          alert("Bill cannot be settled, try again later.");
        }
      },
      err => {
        console.log("Settle PARTIAL Bill",err);
        alert("Bill cannot be settled, try again later.");
      });
    }
  }

  convNumber(num){
    return parseFloat(num);
  }

  validate_date(){
    let flag = false;
    if(this.payDate == null || this.payDate == undefined || this.payDate == ""){
      return;
    }
    if(this.payDate.split("-").length != 3){
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let dt = parseInt(this.payDate.split("-")[0]);
    let mnth = parseInt(this.payDate.split("-")[1])-1;
    let year = parseInt(this.payDate.split("-")[2]);
    if(dt == NaN || mnth == NaN || year == NaN || year <= 2000){
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let febDays = 28;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      febDays = 29;
    }

    switch(mnth) {
      case 0:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 1:
        if(!(dt >= 1 && dt <= febDays)){
          flag = true;
        }
        break;
      case 2:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 3:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 4:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 5:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 6:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 7:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 8:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 9:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      case 10:
        if(!(dt >= 1 && dt <= 30)){
          flag = true;
        }
        break;
      case 11:
        if(!(dt >= 1 && dt <= 31)){
          flag = true;
        }
        break;
      default:
        flag = true;
    }
    this.dateError = flag;
    return flag;
  }
}
