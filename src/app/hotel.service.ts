import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  server: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  getUserHotel(uid){
    let userData = { 
      "userid": uid
    };

    return this._http.post(this.server + 'assets/db/hotel.php?action=userHotel', userData);
  }
}
