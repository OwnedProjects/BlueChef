import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  server: any;
  uid: any;
  deldt = new Date();
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }
  getUnit(){
    return this._http.get(this.server + 'assets/db/product.php?action=unitList')
  }
  addProduct(pname, uname,userid) {
    
    this.uid = uname.split('.')[0];
    let productObj = {
      'pname': pname,
      'uid': this.uid,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/product.php?action=addProduct", productObj);
  }

  getProduct(){
    return this._http.get(this.server + 'assets/db/product.php?action=getProduct')
  }
  toggleProduct(pid, action, userid) {
    let toggleObj = {
      'pid': pid,
      'action': action,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/product.php?action=toggleProduct", toggleObj);
  }
  editProduct(pname, uname,pid,userid) {
    this.uid = uname.split('.')[0];
    let editObj = {
      'pid':pid,
      'pname': pname,
      'uid': this.uid,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    console.log(editObj)
    return this._http.post(this.server + "assets/db/product.php?action=editProduct", editObj);
  }
}
