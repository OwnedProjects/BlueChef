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
  deldt = new Date();
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  addRate(hname, mname, rate, userid) {

    this.hid = hname.split('.')[0];
    this.mid = mname.split('.')[0];
    let rateObj = {
      'hid': this.hid,
      'mid': this.mid,
      'rate': rate,
      'date': this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/rate.php?action=addRate", rateObj);
  }
  getHotelRate(hname) {
    this.hid = hname.split('.')[0];
    let hotelrateObj = {
      'hid': this.hid
    }
    return this._http.post(this.server + 'assets/db/rate.php?action=hotelRate', hotelrateObj)
  }

  toggleHotelRate(hrid, action, userid) {
    let toggleObj = {
      'hrid': hrid,
      'action': action,
      'date': this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/rate.php?action=toggleRate", toggleObj);
  }

  editRate(rate, rid, userid) {
 
    let editObj = {
      'rid': rid,
      'rate': rate,
      'date': this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/rate.php?action=editRate", editObj);
  }

}
