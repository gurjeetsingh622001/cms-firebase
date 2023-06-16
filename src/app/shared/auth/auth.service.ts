import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // saving token user token in local storge  code starts 
  storetoken(data: any) {
    localStorage.setItem("token", data.token)
  }

  gettoken() {
    return localStorage.getItem("token")
  }
  destroytoken() {
    localStorage.removeItem("token")
  }
  // saving token user token in local storge  code starts 

  //saving user Id 
  saveuserId(data: any) {
    localStorage.setItem('userId', data.userId)
  }

  getuserId() {
    return localStorage.getItem('userId')
  }

  destroyId() {
    localStorage.removeItem('userId')
  }


  constructor() { }
}
