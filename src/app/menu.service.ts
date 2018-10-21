import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  server: any;
  mtype: any;
  tid: any;
  deldt = new Date();
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  getAllMenus() {
    return this._http.get(this.server + 'assets/db/menu.php?action=allMenus');
  }
  getMtype() {
    return this._http.get(this.server + 'assets/db/menu.php?action=menuType');
  }
  getMenuList() {
    return this._http.get(this.server + 'assets/db/menu.php?action=menuList');
  }

  addMenu(mname, mtype, userid) {

    this.mtype = mtype.split('.')[0];
    let menuObj = {
      'mname': mname,
      'mtypeid': this.mtype,
      'userid': userid,
      'date': this.deldt.getTime(),
    }
    return this._http.post(this.server + "assets/db/menu.php?action=addMenu", menuObj);
  }
  toggleMenu(mid, action, userid) {

    let toggleObj = {
      'mid': mid,
      'action': action,
      'userid': userid,
      'date': this.deldt.getTime(),
    }
    return this._http.post(this.server + "assets/db/menu.php?action=toggleMenu", toggleObj);
  }
  editProduct(mid, mname, mtype, userid) {
    this.tid = mtype.split('.')[0];
    let editObj = {
      'mid': mid,
      'mname': mname,
      'tid': this.tid,
      'date': this.deldt.getTime(),
      'userid': userid
    }
    return this._http.post(this.server + "assets/db/menu.php?action=editMenu", editObj);
  }

}

