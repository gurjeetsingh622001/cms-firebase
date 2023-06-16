import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {



  // buttonValidation: Boolean = false
  editEmployeeForm: FormGroup;
  customerEmail: any;

  constructor(private toastr: ToastrService, private router: Router, private apiService: ApiService, private spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute) {

    this.editEmployeeForm = new FormGroup({
      customerEmail: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+([ \-''][a-zA-Z0-9]+)*(\s*)$/)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+([ \-''][a-zA-Z0-9]+)*(\s*)$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+91|0)?[6789]\d{9}\s?$/)]),
      email: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      status: new FormControl('')
    })


  }


  ngOnInit(): void {

    this.customerEmail = this.activatedRoute.snapshot
      .paramMap.get('customerEmail')

    this.editEmployeeForm.patchValue({
      customerEmail: this.customerEmail
    })

    this.getCustomerById();

  }

  getCustomerById() {
    console.log(this.customerEmail)

    this.spinner.show()
    this.apiService.getCustomerById(this.customerEmail).then(res => {
      console.log(res)

      this.editEmployeeForm.patchValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        phone: res['phone'],
        email: res['email'],
        status: res['status'],
        address: res['address'],

      })

      setTimeout(() => {
        this.toastr.success('sucess', res['message']);
        this.spinner.hide();
      }, 3000);

    }).catch(err => {
      console.log(err)
      this.toastr.error('error', 'some thing went Wrong')
      setTimeout(() => {
        this.spinner.hide()
      }, 3000);

    })

  }


  editCustomer() {

    this.spinner.show()


    this.apiService.updateCustomerById(this.customerEmail, this.editEmployeeForm.value).then(data => {
      console.log(data)
      this.spinner.hide()

    })
      .catch(err => {
        console.log(err)
        this.spinner.hide()

      })

  }

  get get() {
    return this.editEmployeeForm.controls
  }



}
