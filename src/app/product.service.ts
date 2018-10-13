import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  server: any;
  uid: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }
  getUnit(){
    return this._http.get(this.server + 'assets/db/product.php?action=unitList')
  }
  addProduct(pname, uname) {
    this.uid = uname.split('.')[0];
    let productObj = {
      'pname': pname,
      'uid': this.uid,
    }
    return this._http.post(this.server + "assets/db/product.php?action=addProduct", productObj);
  }

  getProduct(){
    return this._http.get(this.server + 'assets/db/product.php?action=getProduct')
  }
}
