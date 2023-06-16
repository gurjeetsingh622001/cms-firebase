import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  userId: any;
  customers: any[];
  filterKey: any;
  refNum: number = 1;
  zeroCustomer: boolean;
  subscription: Subscription;

  constructor(private toastr: ToastrService, private router: Router, private apiService: ApiService, private spinner: NgxSpinnerService, private authService: AuthService) { }

  ngOnInit(): void {

    this.subscription = this.apiService.selectBoxValue$.pipe().subscribe((value: string) => {
      this.filterKey = value;
      this.getCustomers();
    });

    this.userId = this.authService.getuserId();

    this.getCustomers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getCustomers(opt?: string) {
    if (!opt) {
      this.spinner.show()
    }

    this.apiService.getCustomers(this.filterKey).subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.zeroCustomer = true
        }
        console.log(res)

        setTimeout(() => {
          this.toastr.success('sucess', res.message);
          this.spinner.hide();
          this.customers = res
        }, 3000);


      },
      error: (err) => {
        this.toastr.error('error', 'some thing went Wrong')
        setTimeout(() => {
          this.spinner.hide()
        }, 3000);

      }
    })

  }

  deleteCustomer(customerEmail: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


        this.apiService.deleteCustomerByEmail(customerEmail).then(async customerDelted => {
          console.log(customerDelted)
          await this.getCustomers()

          this.spinner.hide()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        })
          .catch(err => {
            console.log(err)
            this.toastr.error(err)
          })

      }

    })


  }

  editCustomer(email: string) {

    this.router.navigate(['/customers/editcustomer', email])

  }

  // async getCustomerById(id: string) {
  //   const documentRef = doc(this.fs, 'customers', id);
  //   try {
  //     const documentSnapshot = await getDoc(documentRef);
  //     if (documentSnapshot.exists()) {
  //       const data = documentSnapshot.data();
  //       const userLoggedInEmail = data['userId']; // Assuming email is the field to filter by
  //       console.log(userLoggedInEmail)
  //       console.log(localStorage.getItem('loggedInUser'))
  //       const storedEmail = localStorage.getItem('loggedInUser'); // Retrieve the stored email from localStorage

  //       if (userLoggedInEmail === storedEmail) {
  //         return data; // Return the document data if the email matches the stored email
  //       } else {
  //         throw new Error('Document not found');
  //       }
  //     } else {
  //       throw new Error('Document not found');
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }



}
