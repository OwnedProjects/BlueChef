import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  server: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  getAllMenus(hotelId){
    let hotelData = { 
      "hid": hotelId
    };
    return this._http.post(this.server + 'assets/db/menu.php?action=allMenus', hotelData);
  }
}
