import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryinService {
  server: any;

  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }


  addInventory(inventoryObj) {
    return this._http.post(this.server + "assets/db/inventoryin.php?action=addInventory", inventoryObj);
  }
}
