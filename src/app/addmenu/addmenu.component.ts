import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './../menu.service';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddMenuComponent implements OnInit {
  mname: string;
  type: string;
  index: number;
  allmenus: any[] = new Array();
  mid: String = null;
  tid: String = null;
  editmenu: number = -1;
  menu_list: any;
  mtype_list: any;
  userdata: any;
  mtype: String = null;

  successFlag: String = null;
  errorFlag: String = null;
  constructor(private _menuService: MenuService, private router: Router) { }


  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    this._menuService.getMtype().subscribe(response => {
      this.mtype_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
    this.getMenu();
    //was giving error was. was coded befor-sufiyan
    // this._menuService.getAllMenus().subscribe(response => {
    //   this.menu_list = response["data"];
    // },
    //   err => {
    //     console.log("Error:", err);
    //   });

  }
  getMenu() {

    this._menuService.getMenuList().subscribe(response => {
      this.menu_list = response["data"];
    },
      err => {
        console.log("Error:", err);
      });
  }
  addMenu() {
    this._menuService.addMenu(this.mname, this.mtype, this.userdata[0].id)
      .subscribe(response => {
     
        if (response["status"] == 200) {
          this.getMenu();
          this.successFlag = "Menu added successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);
        }
        else {
          this.errorFlag = "Menu cannot be added now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          console.log(error);

        })
    //reset fields
    this.mname = this.mtype = null;

  }
  toggleMenu(id, action) {
    this._menuService.toggleMenu(id, action, this.userdata[0].id)
      .subscribe(response => {

        if (response["status"] == 200) {
          this.getMenu();
        }
        else {
          alert("Can not deactivat menu.Please try again later")
        }
      },
        error => {
          console.log(error);

        })
  }

  edit_Menu(index, mid,tid) {
    this.mid = mid;
    this.tid = tid;
    this.editmenu = index + 1;
    this.mname = this.menu_list[index].name;
    this.mtype =this.tid+'.'+ this.menu_list[index].mtype;
    window.scroll(0,0);
  }

  cancel_edit_Menu() {
    this.mname = null;
    this.mtype = null;
    this.editmenu = -1;
  }

  editMenuSave() {
    this._menuService.editProduct(this.mid,this.mname, this.mtype,this.userdata[0].id)
      .subscribe(response => {
        console.log(response);
        this.editmenu =-1;
        if (response["status"] == 200) {
          this.getMenu();
          this.successFlag = "Menu edited successfully";
          setTimeout(() => {
            this.successFlag = null;
          }, 3000);

        }
        else {
          this.errorFlag = "Menu cannot be edited now, Kindly try after some time";
          setTimeout(() => {
            this.errorFlag = null;
          }, 3000);
        }
      },
        error => {
          //console.log(error);

        })
    //reset fields
    this.mname = this.mtype = null;

  }
}
