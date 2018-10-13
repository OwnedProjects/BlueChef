import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  server: any;
  hid: any;
  mid: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  addRate(hname, mname,rate, userid) {
    
    this.hid = hname.split('.')[0];
    this.mid = mname.split('.')[0];
    let rateObj = {
      'hid':  this.hid,
      'mid':  this.mid,
      'rate': rate,
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/rate.php?action=addRate", rateObj);
  }
}
