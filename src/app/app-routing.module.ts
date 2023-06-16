import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authguard } from './authGuard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDashComponent } from './customers/customer-dash/customer-dash.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 
  {
    path: 'customers', component: CustomersComponent, canActivate: [Authguard],
    children: [
      { path: 'addcustomer', component: AddCustomerComponent },
      { path: 'editcustomer/:customerEmail', component: EditCustomerComponent },
      { path: 'list', component: CustomerListComponent },
      { path: 'home', component: CustomerDashComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
