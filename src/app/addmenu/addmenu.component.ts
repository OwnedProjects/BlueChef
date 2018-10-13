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

  menu_list: any;
  mtype_list: any;
  userdata: any;
  mtype: String = null;

  successFlag: String = null;
  errorFlag: String = null;
  searchInput: string;

  constructor(private _menuService: MenuService, private router: Router) { }


  ngOnInit() {
    if (sessionStorage.getItem("userdata")) {
      this.userdata = JSON.parse(sessionStorage.getItem("userdata"));
    } else {
      this.router.navigate(["/home"]);
    }
    
    this.menuType();
    this.getMenuItems();

    //was giving error was. was coded befor-sufiyan
    // this._menuService.getAllMenus().subscribe(response => {
    //   this.menu_list = response["data"];
    // },
    //   err => {
    //     console.log("Error:", err);
    //   });
  }

  menuType() {
    this._menuService.getMtype().subscribe(response => {
      this.mtype_list = response["data"];
    }, err => {
      console.log("Error:", err);
    });
  }

  getMenuItems() {
    this._menuService.getMenuList().subscribe(response => {
      this.menu_list = response["data"];
    }, err => {
      console.log("Error:", err);
    });
  }

  addMenu() {
    this._menuService.addMenu(this.mname, this.mtype, this.userdata[0].id)
      .subscribe(response => {
        // console.log(response);
        if (response["status"] == 200) {
          this.getMenuItems();
          this.successFlag = 'Menu added successfully';
          setTimeout(() => {
            this.successFlag = null;
          }, 5000);
        }  else {
          this.errorFlag = 'Menu cannot be added now, Kindly try after some time';
          setTimeout(() => {
            this.errorFlag = null;
          }, 5000);
        }
      }, error => {
        console.log(error);
      });
    // reset fields
    this.mname = this.mtype = null;
  }


  toggleMenu(id, action) {
    this._menuService.toggleMenu(id, action, this.userdata[0].id).subscribe(response => {
        if (response["status"] === 200) {
          this.getMenuItems();
        } else {
          alert("Can not deactivat menu.Please try again later")
        }
      }, error => {
        console.log(error);
      });
  }

}
