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
  product_list: any;
  successFlag: String = null;
  errorFlag: String = null;
  searchProduct: string;

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }

    this.getUnits();
    this.getProducts();
  }

  getUnits() {
    this._productService.getUnit().subscribe(response => {
      this.unit_list = response["data"];
    }, err => {
      console.log("Error:", err);
    });
  }

  getProducts() {
    this._productService.getProduct().subscribe(response => {
      this.product_list = response["data"];
    }, err => {
      console.log("Error:", err);
    });
  }

  addProduct() {
    this._productService.addProduct(this.pname, this.uname)
      .subscribe(response => {
        console.log(response);
        if (response["status"] == 200) {
          this._productService.getProduct().subscribe(response => {
            this.product_list = response["data"];
          },
            err => {
              console.log("Error:", err);
            });
          this.successFlag = "Product added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }  else {
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
  
}
