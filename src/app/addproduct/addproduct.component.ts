import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  unit_list: any;
  userdata: any;
  pname: String = null;
  uname: String = null;
  pid: String = null;
  uid: String = null;
  editproduct: number = -1;
  product_list: any;
  successFlag: String = null;
  errorFlag: String = null;
  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._productService.getUnit().subscribe(response => {

      this.unit_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
    this.getProduct();
  }

  addProduct() {
    this._productService.addProduct(this.pname, this.uname, this.userdata[0].id)
      .subscribe(response => {
        console.log(response);
        if (response["status"] == 200) {
          this.getProduct();
          this.successFlag = "Product added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Product cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          //console.log(error);

        })
    //reset fields
    this.pname = this.uname = null;

  }
  getProduct() {
    this._productService.getProduct().subscribe(response => {
      this.product_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }
  toggleProduct(id, action) {
    this._productService.toggleProduct(id, action, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getProduct();
        }
        else {
          alert("Can not deactivate hotel.Please try again later")
        }
      },
        error => {
          console.log(error);

        })
  }

  edit_Product(index, pid,uid) {
    this.pid = pid;
    this.uid = uid;
    this.editproduct = index + 1;
    this.pname = this.product_list[index].pname;
    this.uname =this.uid+'.'+ this.product_list[index].uname;
    window.scroll(0,0);
  }

  cancel_edit_Product() {
    this.pname = null;
    this.uname = null;
    this.editproduct = -1;
  }
  editProdSave() {
    console.log("editsave"+this.uid);
    this._productService.editProduct(this.pname, this.uname, this.pid, this.userdata[0].id)
      .subscribe(response => {
        console.log(response);
        this.editproduct =-1;
        if (response["status"] == 200) {
          this.getProduct();
          this.successFlag = "Product edited successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Product cannot be edited now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          //console.log(error);

        })
    //reset fields
    this.pname = this.uname = null;

  }
}
