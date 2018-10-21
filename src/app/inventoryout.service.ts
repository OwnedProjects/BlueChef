import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryoutService {
  server: any;

  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  getProduct() {
    return this._http.get(this.server + 'assets/db/inventoryout.php?action=getStockProducts')
  }
  checkQunatity(pid) {
    let tempObj = {
      'pid': pid
    }
    return this._http.post(this.server + 'assets/db/inventoryout.php?action=checkQuantity', tempObj)
  }

  removeInventory(inventoryObj) {
    return this._http.post(this.server + "assets/db/inventoryout.php?action=removeInventory", inventoryObj);
  }
}

