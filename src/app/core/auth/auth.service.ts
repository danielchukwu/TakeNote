import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenName = "token";
  user = "user";

  constructor() {}

  // Token
  setToken(token: String) {
    localStorage.setItem(this.tokenName, JSON.stringify(token));
  }

  getToken(): String {
    const token = localStorage.getItem(this.tokenName);
    if (token) {
      return JSON.parse(token);
    }
    return "";
  }

  removeToken() {
    localStorage.removeItem(this.tokenName);
  }

  // User
  setUser(userData: any) {
    localStorage.setItem(this.user, JSON.stringify(userData));
  }

  getUser(): any {
    const user = localStorage.getItem(this.user);
    if (user) {
      return JSON.parse(user);
    }
    return "";
  }

  removeUser() {
    localStorage.removeItem(this.user);
  }

  // Clear LocalStorage
  clear() {
    localStorage.clear();
  }
}
