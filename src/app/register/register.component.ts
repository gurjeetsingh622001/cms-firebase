import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api/api.service';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // buttonValidation: Boolean = false
  adduserForm: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private apiService: ApiService, private spinner: NgxSpinnerService) {

    this.adduserForm = new FormGroup({
      returnSecureToken: new FormControl(true),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+91|0)?[6789]\d{9}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/), Validators.minLength(6), Validators.maxLength(50)]),
      confirm_pass: new FormControl('', [Validators.required, this.confirmPass()])
    })

  }


  ngOnInit(): void {
    // console.log(this.adduserForm.status === 'INVALID')
  }


  // register() {
  //   // this.buttonValidation = true
  //   if (this.adduserForm.status === 'INVALID') {
  //     return this.adduserForm.markAllAsTouched();
  //   }
  //   else {

  //     this.spinner.show()
  //     this.apiService.userRegister(this.adduserForm.value).then(userRegistered => {

  //       console.log(userRegistered)
  //       if (userRegistered !== undefined) {
  //         setTimeout(() => {
  //           this.router.navigateByUrl('login')
  //           this.spinner.hide()
  //         }, 3000)

  //       }
  //       setTimeout(() => {
  //         this.spinner.hide()
  //       }, 3000)

  //     })
  //       .catch(err => {
  //         console.log(err)

  //         setTimeout(() => {
  //           this.spinner.hide()
  //         }, 3000)

  //       })
  //   }

  // }

  register() {

    const user = {
      email: this.adduserForm.value.email,
      password: this.adduserForm.value.password,
      returnSecureToken: true
    }

    if (this.adduserForm.status === 'INVALID') {
      return this.adduserForm.markAllAsTouched();
    }
    else {
      this.spinner.show()

      this.apiService.userRegister(user).subscribe({
        next: (res: any) => {
          this.toastr.success('user registerd successfully')
          this.router.navigateByUrl('login')
          // console.log(res)
          this.spinner.hide()
        },
        error: (err: any) => {
          // console.log(err)
          this.toastr.error('something went wrong')

          this.spinner.hide()
        }
      })
    }
  }

  get get() {
    return this.adduserForm.controls
  }

  confirmPass(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let password = this.adduserForm?.controls['password']?.value
      let confirm_pass = this.adduserForm?.controls['confirm_pass']?.value
      if (password === confirm_pass) {
        return null
      }
      else {
        return { 'confirmPassword': true }
      }
    }
  }

}
