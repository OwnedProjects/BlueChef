import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryoutService } from '../inventoryout.service';


@Component({
  selector: 'app-inventoryout',
  templateUrl: './inventoryout.component.html',
  styleUrls: ['./inventoryout.component.css']
})
export class InventoryoutComponent implements OnInit {

  constructor(private router: Router, private _inventoryinService: InventoryoutService) { }
  product_list: any;
  product: any;
  userdata: any;
  pname: String = null;
  quantity: any = null;
  prodError: String = null;
  qtyError: Boolean = true;
  editProdcut: number = -1;
  outproducts: any = new Array();
  dateError: Boolean = false;
  dtpDelDate: String = null;
  successFlag: String = null;
  errorFlag: String = null;
  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }

    this._inventoryinService.getProduct().subscribe(response => {
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
      "qty": parseFloat(this.quantity),
    };
    this._inventoryinService.checkQunatity(parseFloat(this.pname.split(".")[0])).subscribe(response => {
      this.product = response["data"];

      if (Number(this.product[0].qty) >= Number(this.quantity)) {
        this.outproducts.push(tmpProd);
        this.pname = this.quantity = null;
      }
      else {
        alert("Not enough stock for" + this.pname.split(".")[1] + " avilable.Only " + this.product[0].qty + " left in stock")
      }
    },
      err => {
        console.log("Error:", err);
      });


    ;
  }

  remove_prodcut(index) {
    this.outproducts.splice(index, 1);

  }

  edit_product(index, pid) {
    this.editProdcut = index;
    this.pname = pid + "." + this.outproducts[index].pname;
    this.quantity = this.outproducts[index].qty;

  }
  save_editProduct() {
    this._inventoryinService.checkQunatity(parseFloat(this.pname.split(".")[0])).subscribe(response => {
      this.product = response["data"];
      if (Number(this.product[0].qty) >= Number(this.quantity)) {
        this.outproducts[this.editProdcut].qty = this.quantity;
        this.outproducts[this.editProdcut].pname = this.pname;
        this.cancel_editProduct();
      }
      else {
        alert("Not enough stock for" + this.pname.split(".")[1] + " avilable.Only " + this.product[0].qty + " left in stock")
      }
    },
      err => {
        console.log("Error:", err);
      })

  }

  cancel_editProduct() {
    this.pname = null;
    this.quantity = null;
    this.editProdcut = -1;
  }
  remove_inventory() {
    let deldt = new Date();
    deldt.setDate(parseInt(this.dtpDelDate.split("/")[0]));
    deldt.setMonth(parseInt(this.dtpDelDate.split("/")[1]) - 1);
    deldt.setFullYear(parseInt(this.dtpDelDate.split("/")[2]));
    let newInventory = {
      date: deldt.getTime(),
      outproducts: this.outproducts,
      userid: this.userdata[0].id
    };

    this._inventoryinService.removeInventory(newInventory)
      .subscribe(response => {
        if (response["status"] == 200) {

          this.successFlag = "Inventory Removed successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Inventory cannot be Removed now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.pname = this.dtpDelDate = this.quantity = null;
    this.outproducts.length = 0

  }

}
