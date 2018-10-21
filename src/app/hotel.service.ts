import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  server: any;
  hcont: any;
  hcontid: any;
  uid:any;
  deldt = new Date();
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  getAllHotels(){
    return this._http.get(this.server + 'assets/db/hotel.php?action=allHotels')
  }

  getUserHotel(usrId){
    return this._http.get(this.server + 'assets/db/hotel.php?action=userHotel&usrId='+usrId)
  }
  
  getUsers(){
    return this._http.get(this.server + 'assets/db/hotel.php?action=usersList')
  }

  addHotel(hname, hadd, hcont, hno, userid) {
    this.hcontid = hcont.split('.')[0];
    this.hcont = hcont.split('.')[1];
    let hotelObj = {
      'hname': hname,
      'hadd': hadd,
      'hcontid': this.hcontid,
      'hcont': this.hcont,
      'hno': hno,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/hotel.php?action=addHotel", hotelObj);
  }

  toggleHotel(hid, action, userid) {
    let toggleObj = {
      'hid': hid,
      'action': action,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/hotel.php?action=toggleHotel", toggleObj);
  }

  edithotel(hid,hname, hadd,hno,hcont,userid) {
    this.hcontid = hcont.split('.')[0];
    this.hcont = hcont.split('.')[1];
    let editObj = {
      'hid':hid,
      'hname': hname,
      'hadd':hadd,
      'hcontid': this.hcontid,
      'hcont': this.hcont,
      'hno': hno,
      'date':this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/hotel.php?action=editHotel", editObj);
  }
}
