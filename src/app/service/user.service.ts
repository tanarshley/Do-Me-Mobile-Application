import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn = false;

  userId: string;
  fullname: string;
  email: string;
  birthdate: string;
  password: string;

  userObject = { userId: '', fullname: '', email: '', birthdate: '', password: '' };

  constructor() { }

  setUser(userObject: any) {
    this.userObject.userId = userObject.user_id;
    this.userObject.fullname = userObject.fullname;
    this.userObject.email = userObject.email;
    this.userObject.birthdate = userObject.birthdate;
    this.userObject.password = userObject.password;
  }

  getUser() {
    return this.userObject;
  }

  setLoggedIn() {
    this.loggedIn = true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedOut() {
    this.loggedIn = false;
  }

  clearLoggedData() {
    this.userObject.userId = '';
    this.userObject.fullname = '';
    this.userObject.email = '';
    this.userObject.birthdate = '';
    this.userObject.password = '';
  }
}
