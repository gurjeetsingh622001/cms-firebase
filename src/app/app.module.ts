import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from './customers/header/header.component';
import { ChartModule } from 'primeng/chart';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CustomerDashComponent } from './customers/customer-dash/customer-dash.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    // WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    // ViewuserComponent,
    // EdituserComponent,
    // AddBrandComponent,
    // ViewBrandComponent,
    // ProductsComponent,
    // CartComponent,
    // HomeComponent,
    HeaderComponent,
    // DashboardComponent,
    // UserComponent,
    // NavComponent,
    // UDashComponent,
    // MyAdsComponent,
    // PostAdsComponent,
    // PostComponent,
    // EditPostComponent,
    // ChartComponent,
    // QuestionComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomersComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    CustomerDashComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ChartModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    StepsModule,
    InputTextareaModule,
    RadioButtonModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    TableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Title: Customer Management System (CMS) in Angular

  // Objective: The goal of this assignment is to create a simple Customer Management System (CMS) in Angular, utilizing key features of Angular like components, services, and routing. The CMS will allow users to add, edit, view, and delete customers from a list.

  // Features to implement:

  // Login page: Create a simple login page with hard-coded username and password. After successful login, the user should be redirected to the customer list page.

  // Customer List page: This page should display a list of customers in a table format. Each customer record should contain the following fields: 'First Name', 'Last Name', 'Email', 'Phone Number', and 'Address'. At the top of the page, there should be a 'Add New Customer' button that redirects to the 'Add Customer' page.

  // Add Customer page: This page should contain a form to add a new customer to the list. The form should have fields corresponding to the customer record fields and a 'Submit' button to add the customer to the list. After successfully adding a customer, redirect to the 'Customer List' page.

  // Edit Customer page: From the 'Customer List' page, each customer should have an 'Edit' button that leads to an 'Edit Customer' page. This page should be pre-filled with the selected customer's information. After editing, the 'Submit' button should save the changes and redirect to the 'Customer List' page.

  // Delete Customer feature: On the 'Customer List' page, each customer record should have a 'Delete' button to remove the customer from the list. After deletion, the list on the page should be immediately updated.

  // Services and Routing: Use Angular's services and dependency injection to handle data storage and manipulation. Use Angular routing for navigating between different components/pages.

  // Validation: The forms on the 'Add Customer' and 'Edit Customer' pages should have validation. All fields should be required, and the email field should validate for proper email format.




  // rules

  //   rules_version = '2';

  // service cloud.firestore {
  //   match /databases/{database}/documents {

  // This rule allows anyone with your Firestore database reference to view, edit,
  // and delete all data in your Firestore database. It is useful for getting
  // started, but it is configured to expire after 30 days because it
  // leaves your app open to attackers. At that time, all client
  // requests to your Firestore database will be denied.
  //
  // Make sure to write security rules for your app before that time, or else
  // all client requests to your Firestore database will be denied until you Update
  // your rules
  // match /{document=**} {
  //   allow read, write: if request.time < timestamp.date(2023, 7, 14);
  //     }
  //   }
  // }


}
