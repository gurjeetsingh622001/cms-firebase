import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  // buttonValidation: Boolean = false
  addEmployeeForm: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private apiService: ApiService, private spinner: NgxSpinnerService, private authService: AuthService) {

    this.addEmployeeForm = new FormGroup({
      userId: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+([ \-''][a-zA-Z0-9]+)*(\s*)$/)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+([ \-''][a-zA-Z0-9]+)*(\s*)$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+91|0)?[6789]\d{9}\s?$/)]),
      email: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      status: new FormControl('Active')
    })


  }


  ngOnInit(): void {

    this.addEmployeeForm.patchValue({
      userId: localStorage.getItem('loggedInUser')
    })

    // console.log(this.addUserForm.status === 'INVALID')

  }


  addCustomer() {

    const user = this.addEmployeeForm.value
    user.docRefEmail = this.addEmployeeForm.value.email

    this.spinner.show()
    this.apiService.addCustomer(this.addEmployeeForm.value).then(resData => {
      console.log(resData)

      this.spinner.hide()

    })
      .catch(err => {
        // this.toastr.success('something went wrong')
        this.spinner.hide()
      })

  }

  get get() {
    return this.addEmployeeForm.controls
  }




}
