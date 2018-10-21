import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  server: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }

  validateLogin(unm, pwd){
    //console.log("validateLogin", unm, pwd);
    return this._http.get(this.server+"assets/db/login.php?action=checkLogin&usernm="+unm+"&passwd="+pwd);
  }

  checkLicense(){
    return this._http.get(this.server+"assets/db/licConn.php");
  }
}