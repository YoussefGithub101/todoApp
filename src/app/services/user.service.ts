import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any = new BehaviorSubject(null)
  username!:string;
  
  constructor(private http: HttpClient, public _Router: Router) {
    if (localStorage.getItem("data") != null) {
      this.saveUserData()
   }
   }

   saveUserData(): any {
 
    let data = JSON.stringify(localStorage.getItem("data"))
    this.userData.next(jwtDecode(data))
    this.username = this.userData.value.user.firstName
 }
 userIdData(): any {
  let data = JSON.stringify(localStorage.getItem("data"))
  this.userData.next(jwtDecode(data))
  return this.userData.value.user._id
}

logOut() {
  localStorage.removeItem("data")
 
 
  this.userData.next(null)
  this._Router.navigate(["login"])
}

register(formData: object): Observable<any> {
  return this.http.post(`https://shop-admin-panel-1.onrender.com/signup`, formData)
}
loginn(formData: object): Observable<any> {
  return this.http.post(`https://shop-admin-panel-1.onrender.com/login`, formData)
}

}
