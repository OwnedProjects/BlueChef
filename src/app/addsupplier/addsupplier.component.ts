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
  sid: String = null;
  editSupplier: number = -1;
  sname: String = null;
  sadd: String = null;
  scontp: String = null;
  scontno: String = null;

  successFlag: String = null;
  errorFlag: String = null;
  constructor(private _supplierService: SupplierService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
   this.getSupplier();

   
  }
  getSupplier() {
    this._supplierService.getSuppliers().subscribe(response => {
      this.supplier_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }

  addSupplier() {
    this._supplierService.addSupplier(this.sname, this.sadd, this.scontp, this.scontno, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getSupplier();
          this.successFlag = "Supplier added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);
        }
        else {
          this.errorFlag = "Supplier cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.sname = this.sadd = this.scontp = this.scontno = null;

  }

  toggleSupplier(id, action) {
    this._supplierService.toggleSuppliers(id, action, this.userdata[0].id)
      .subscribe(response => {
        if (response["status"] == 200) {
          this.getSupplier();
        }
        else {
          alert("Can not deactivate hotel.Please try again later")
        }
      },
        error => {
          console.log(error);

        })


  }
  keyPressNum(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  edit_Supplier(index, sid) {
    this.sid = sid;
    
    this.editSupplier = index + 1;
    this.sname = this.supplier_list[index].name;
    this.sadd = this.supplier_list[index].address;
    this.scontp = this.supplier_list[index].contact_person;
    this.scontno = this.supplier_list[index].cont_no;
    
    window.scroll(0, 0);
  }

  cancelEditSupplier() {
    this.sname = null;
    this.sadd = null;
    this.scontp = null;
    this.scontno = null;
    this.editSupplier = -1;
  }

  saveEditSupplier() {
    this._supplierService.editSupplier( this.sid,this.sname, this.sadd, this.scontp, this.scontno, this.userdata[0].id)
      .subscribe(response => {
     
        this.editSupplier = -1;
        if (response["status"] == 200) {
          this.getSupplier();
          this.successFlag = "Supplier edited successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Supplier cannot be edited now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          //console.log(error);

        })
    //reset fields
      this.sname = this.sadd = this.scontp = this.scontno = null;

  }
  
}
