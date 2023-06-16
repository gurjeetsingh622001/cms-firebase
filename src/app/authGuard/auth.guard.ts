import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class Authguard implements CanActivate {
    constructor(private authservice: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('loggedInUser') != null) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login')
            return false
        }
    }

}

