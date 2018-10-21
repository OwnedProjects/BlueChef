import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { ProductService } from './../product.service';
import { InventoryinService } from '../inventoryin.service';

@Component({
  selector: 'app-inverntoryin',
  templateUrl: './inverntoryin.component.html',
  styleUrls: ['./inverntoryin.component.css']
})
export class InverntoryinComponent implements OnInit {

  supplier_list: any;
  product_list: any;
  userdata: any;
  sname: String = null;
  billno: String = null;
  pname: String = null;
  quantity: any = null;
  qtyError: Boolean = true;
  rate: any = null;
  rateError: Boolean = true;
  supplier_products: any = new Array();
  totalAmount: number = 0;
  editProdcut: number = -1;
  prodError: String = null;
  dateError: Boolean = false;
  dtpDelDate: String = null;
  successFlag: String = null;
  errorFlag: String = null;

  constructor(private _inventoryinService: InventoryinService, private _supplierService: SupplierService, private router: Router, private _productService: ProductService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._supplierService.getSuppliers().subscribe(response => {
      this.supplier_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
    this._productService.getProduct().subscribe(response => {
      this.product_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }
  //product validation
  check_prod_name() {
    let flag: Boolean = false;
    if (this.pname) {
      for (let i in this.product_list) {
        if (this.pname.split(".")[1] == this.product_list[i].pname) {
          flag = true;
          break;
        }
      }
      if (flag == true) {
        this.prodError = null;
      }
      else {
        this.prodError = "Invalid Product";
      }
    }
    return flag;
  }
  //number quantity
  validate_quantity() {
    if (this.quantity) {
      let pattern = /^\d*$/;
      this.qtyError = pattern.test(this.quantity);
    }
  }
  //number rate
  validate_rate() {
    if (this.rate) {
      let pattern = /^\d*$/;
      this.rateError = pattern.test(this.rate);
    }

  }
  //allow only numbers
  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  //validate date
  validate_date() {
    let flag = false;
    if (this.dtpDelDate == null || this.dtpDelDate == undefined || this.dtpDelDate == "") {
      return;
    }
    if (this.dtpDelDate.split("/").length != 3) {
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let dt = parseInt(this.dtpDelDate.split("/")[0]);
    let mnth = parseInt(this.dtpDelDate.split("/")[1]) - 1;
    let year = parseInt(this.dtpDelDate.split("/")[2]);
    if (dt == NaN || mnth == NaN || year == NaN || year <= 2000) {
      flag = true;
      this.dateError = flag;
      return flag;
    }
    let febDays = 28;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      febDays = 29;
    }

    switch (mnth) {
      case 0:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 1:
        if (!(dt >= 1 && dt <= febDays)) {
          flag = true;
        }
        break;
      case 2:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 3:
        if (!(dt >= 1 && dt <= 30)) {
          flag = true;
        }
        break;
      case 4:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 5:
        if (!(dt >= 1 && dt <= 30)) {
          flag = true;
        }
        break;
      case 6:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 7:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 8:
        if (!(dt >= 1 && dt <= 30)) {
          flag = true;
        }
        break;
      case 9:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      case 10:
        if (!(dt >= 1 && dt <= 30)) {
          flag = true;
        }
        break;
      case 11:
        if (!(dt >= 1 && dt <= 31)) {
          flag = true;
        }
        break;
      default:
        flag = true;
    }
    this.dateError = flag;
    return flag;
  }

  add_product() {
    let tmpProd: any = {
      "prodid": parseFloat(this.pname.split(".")[0]),
      "pname": this.pname.split(".")[1],
      "rate": this.rate,
      "qty": parseFloat(this.quantity),
      "amount": parseFloat(this.quantity) * parseFloat(this.rate)
    };
    this.supplier_products.push(tmpProd);
    this.calc_total_order_amount();
    this.pname = this.quantity = this.rate = null;
    ;
  }
  calc_total_order_amount() {
    let totamount = 0;
    if (this.supplier_products.length > 0) {
      for (let i in this.supplier_products) {
        totamount += this.supplier_products[i].amount;
      }
      this.totalAmount = totamount;
    }
    else {
      this.totalAmount = 0;
    }
  }

  remove_prodcut(index) {
    this.supplier_products.splice(index, 1);
    this.calc_total_order_amount();
  }

  edit_product(index) {
    this.editProdcut = index;
    this.pname = this.supplier_products[index].pname;
    this.quantity = this.supplier_products[index].qty;
    this.rate = this.supplier_products[index].rate;
  }
  save_editProduct() {
    this.supplier_products[this.editProdcut].qty = this.quantity;
    this.supplier_products[this.editProdcut].rate = this.rate;
    this.supplier_products[this.editProdcut].amount = this.supplier_products[this.editProdcut].rate * this.quantity;
    this.calc_total_order_amount();
    this.cancel_editProduct();
  }

  cancel_editProduct() {
    this.pname = null;
    this.quantity = null;
    this.rate = null;
    this.editProdcut = -1;
  }

  add_inventory() {

    let deldt = new Date();
    deldt.setDate(parseInt(this.dtpDelDate.split("/")[0]));
    deldt.setMonth(parseInt(this.dtpDelDate.split("/")[1]) - 1);
    deldt.setFullYear(parseInt(this.dtpDelDate.split("/")[2]));

    let suppid = this.sname.split('.')[0];
    let newInventory = {
      suppid: suppid,
      date: deldt.getTime(),
      billno: this.billno,
      product_list: this.supplier_products,
      total: this.totalAmount,
      userid: this.userdata[0].id
    };

    this._inventoryinService.addInventory(newInventory)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.successFlag = "Inventory added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Inventory cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.sname = this.dtpDelDate = this.billno = this.totalAmount= null;
    this.supplier_products.length=0 

  }

}




