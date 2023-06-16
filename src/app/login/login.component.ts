import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;



  constructor(private router: Router, private toastr: ToastrService, private authservice: AuthService, private spinner: NgxSpinnerService, private apiService: ApiService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    })
  }

  ngOnInit(): void {

    if (this.authservice.gettoken() != null) {
      this.router.navigateByUrl('/customers')
    }
  }

  login() {
    if (this.loginForm.status === 'INVALID') {
      return this.loginForm.markAllAsTouched();
    }
    else {
      this.spinner.show();

      // this.apiservice.userLogin(this.loginForm.value).subscribe({
      //   next: (res: any) => {
      //     // console.log(res)
      //     if (res.success == true) {
      //       this.toastr.success(res.message)
      //       this.router.navigateByUrl('/customers/home')
      //       this.authservice.storetoken(res)
      //       this.authservice.saveuserId(res)
      //       this.spinner.hide();
      //     }
      //     else {
      //       this.toastr.error('Error', res.message)
      //       this.spinner.hide();
      //     }
      //   },
      //   error: (err: any) => {
      //     this.toastr.error('Error', err.message)
      //     this.spinner.hide();
      //   }
      // })
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        returnSecureToken: true
      }
      console.log(user)

      this.apiService.userLogin(user).subscribe({
        next: (res: any) => {
          console.log(res)
          if (res.registered === true) {
            localStorage.setItem('loggedInUser', res.email)
            localStorage.setItem('authToken', res.idToken)
            this.router.navigateByUrl('/customers/home')
          }
          this.spinner.hide()
        },
        error: (err: any) => {
          console.log(err)
          this.toastr.error('error', err.error.error.message)
          this.spinner.hide()
        }
      })


    }
  }

  get get() {
    return this.loginForm.controls
  }
}
