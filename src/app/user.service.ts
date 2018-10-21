import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  server: any;
  roleid: any;
  constructor(private _http: HttpClient, private _global: GlobalService) {
    this.server = _global.serverpath;
  }
  addUser(uname, fname, lname, passwd, contact, role, userid) {
    this.roleid = role.split('.')[0];
    let userObj = {
      'uname': uname,
      'fname': fname,
      'lname': lname,
      'passwd': passwd,
      'cont': contact,
      'roleid': this.roleid,
      'userid': userid
    }
    console.log("addUser", uname, fname, lname, passwd, contact, role,this.roleid);
    return this._http.post(this.server + "assets/db/user.php?action=addUser", userObj);
  }
  getRoles() {
    return this._http.get(this.server + 'assets/db/user.php?action=getRoles');
  }

  getUserRole(usrId){
    return this._http.get(this.server + 'assets/db/user.php?action=getUserRole&usrId='+usrId);
  }
}
