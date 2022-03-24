import { Injectable } from '@angular/core';
import { EmployeeDirectoryService } from '../employee-directory/employee-directory.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isUserLoggedIn() {
    const user = sessionStorage.getItem('user');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('user');
  }
}
