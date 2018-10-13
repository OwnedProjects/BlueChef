import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {
  supplier_list: any;
  userdata: any;
  pname: String = null;
  pid: String = null;

  sname: String = null;
  sadd: String = null;
  scontp: String = null;
  scontno: String = null;

  successFlag: String = null;
  errorFlag: String = null;
  search: string;

  constructor(private _supplierService: SupplierService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    
    this.getSupplier();
    // remove this code 
    // this._productService.getProduct().subscribe(response => {
    //   this.product_list = response["data"];
    // },
    //   err => {
    //     console.log("Error:", err);
    //   });
    // remove code
  }

  getSupplier() {
    this._supplierService.getSuppliers().subscribe(response => {
      this.supplier_list = response['data'];
    }, err => {
        console.log("Error:", err);
    });
  }


  addSupplier() {
    this._supplierService.addSupplier(this.sname, this.sadd, this.scontp, this.scontno, this.userdata[0].id)
      .subscribe(response => {
        if (response['status'] === 200) {
         this.getSupplier();

          this.successFlag = `Supplier added successfully`;
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);
        } else {
          this.errorFlag = `Supplier cannot be added now, Kindly try after some time`;
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },  error => {
        console.log(error);
      });
    //reset fields
    this.sname = this.sadd = this.scontp = this.scontno = null;

  }

  toggleSupplier(id, action) {
    this._supplierService.toggleSuppliers(id, action, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] === 200) {
          this.getSupplier();

        } else {
          alert("Can not deactivate hotel.Please try again later")
        }
      }, error => {
        console.log(error);
      });
  }

  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  // remove this code 
  // addProduct() {
  //   if (this.pname != null) {
  //     this.pid = this.pname.split('.')[0];
  //     this.pname = this.pname.split('.')[1];
  //     let productObj = {
  //       'pname': this.pname,
  //       'pid': this.pid,
  //     }
  //     this.supplier_product_list.push(productObj);
  //     this.pname = null;
  //   } else {
  //     alert("Please Select Product to add");
  //   }
  // }

  // removeProduct(index) {
  //   this.supplier_product_list.splice(index, 1);
  // }
  // remove code

}
