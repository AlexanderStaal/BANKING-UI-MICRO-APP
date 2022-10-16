import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }
  IsLoggedIn() {
    return localStorage.getItem("userIsValid") != null;
  }

  HaveRoleAccess(menuename: any) {
    const role = localStorage.getItem("role");
    if (role == 'admin') {
      return true;
    } else {
      if (menuename = 'user') {
        return true;
      }else{
        return false;
      }
    }

  }
}
