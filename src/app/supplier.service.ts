import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  server: any;
  
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  addSupplier(sname, sadd,scontp,scontno, userid ){
    
    let supplierObj = {
      'sname': sname,
      'sadd': sadd,
      'scontp': scontp,
      'scontno': scontno,
      'userid': userid,
    }
    return this._http.post(this.server + "assets/db/supplier.php?action=addSupplier", supplierObj);
  }

  getSuppliers(){
    return this._http.get(this.server + 'assets/db/supplier.php?action=supplierList')
  }

  toggleSuppliers(sid, action, userid) {
    let toggleObj = {
      'sid': sid,
      'action': action,
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/supplier.php?action=toggleSupplier", toggleObj);
  }
}
