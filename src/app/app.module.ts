import { BillService } from './bill.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { RoutesConfig } from './routes.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { DashboardcaterComponent } from './dashboardcater/dashboardcater.component';
import { NeworderComponent } from './neworder/neworder.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { OrderreviewComponent } from './orderreview/orderreview.component';

// Afreen's Components
import { AddUserComponent } from './adduser/adduser.component';
import { RatesComponent } from './rates/rates.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { AddMenuComponent } from './addmenu/addmenu.component';
import { AddHotelComponent } from './addhotel/addhotel.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';

//Sufiyan's Code
import { InverntoryinComponent } from './inverntoryin/inverntoryin.component';
import { InventoryoutComponent } from './inventoryout/inventoryout.component';

//Services
import { LoginService } from './login.service';
import { OrderService } from './order.service';
import { MenuService } from './menu.service';
import { HotelService } from './hotel.service';
import { GlobalService } from './global.service';
// import { SearchByNamePipe } from './search-by-name.pipe';
import { SearchmenuPipe } from './searchmenu.pipe';
import { VieworderComponent } from './vieworder/vieworder.component';
import { ViewallordersComponent } from './viewallorders/viewallorders.component';
import { ViewalloutdelComponent } from './viewalloutdel/viewalloutdel.component';
import { BillingComponent } from './billing/billing.component';

const routes:Routes = RoutesConfig;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DashboardcaterComponent,
    NeworderComponent,
    OrderconfirmationComponent,
    OrderreviewComponent,
    AddUserComponent,
    RatesComponent,
    AddProductComponent,
    AddMenuComponent,
    AddHotelComponent,
    AddsupplierComponent,
    InverntoryinComponent,
    InventoryoutComponent,
    // SearchByNamePipe,
    SearchmenuPipe,
    VieworderComponent,
    ViewallordersComponent,
    ViewalloutdelComponent,
    BillingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [ LoginService, OrderService, MenuService, HotelService, GlobalService, BillService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
