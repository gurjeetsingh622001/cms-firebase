import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentPage: any;
  isUserLoggedIn: boolean = false;
  subscription: Subscription;
  selectBoxValue: string;
  zeroCustomer: boolean;


  constructor(private authservice: AuthService, private router: Router, private activated: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    // console.log('header called')
    this.currentPage = this.activated?.snapshot?.firstChild?.routeConfig?.path;

    // console.log(this.currentPage)

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.activated?.snapshot?.firstChild?.routeConfig?.path;
        console.log(this.currentPage)
      }
    });

    this.isuserloggedInFn()

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isuserloggedInFn() {
    // console.log(localStorage.getItem())
    if (localStorage.getItem('loggedInUser')) {
      this.isUserLoggedIn = true
    }
    else {
      this.isUserLoggedIn = false
      console.log(this.isUserLoggedIn)
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser')
    this.router.navigateByUrl('/login')
  }

  onChange(event: any) {
    // console.log(event.target.value)
    this.apiService.updateSelectBoxValue(event.target.value)
    console.log(event)
  }

}
