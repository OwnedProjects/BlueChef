import { BillingComponent } from './billing/billing.component';
import { ViewalloutdelComponent } from './viewalloutdel/viewalloutdel.component';
import { HomeComponent } from './home/home.component';
import { DashboardcaterComponent } from './dashboardcater/dashboardcater.component';
import { NeworderComponent } from './neworder/neworder.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { OrderreviewComponent } from './orderreview/orderreview.component';
import { VieworderComponent } from './vieworder/vieworder.component';

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
import { ViewallordersComponent } from './viewallorders/viewallorders.component';

export let RoutesConfig: any = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'caterdb', component: DashboardcaterComponent },
    { path: 'neworder', component: NeworderComponent },
    { path: 'conforder', component: OrderconfirmationComponent },
    { path: 'revieworder/:oId', component: OrderreviewComponent },
    { path: 'adduser', component: AddUserComponent },
    { path: 'rates', component: RatesComponent },
    { path: 'addmenu', component: AddMenuComponent },
    { path: 'addhotel', component: AddHotelComponent },
    { path: 'addsupplier', component: AddsupplierComponent },
    { path: 'addproduct', component: AddProductComponent },
    { path: 'invin', component: InverntoryinComponent },
    { path: 'vieworder/:oId/:acceptedFlag', component: VieworderComponent },
    { path: 'invout', component: InventoryoutComponent },
    { path: 'allorders', component: ViewallordersComponent },
    { path: 'alloutdel', component: ViewalloutdelComponent },
    { path: 'billing', component: BillingComponent }
];