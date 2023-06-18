import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';

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
  setUser(userData: User) {
    localStorage.setItem(this.user, JSON.stringify(userData));
  }

  getUser(): User {
    const user = localStorage.getItem(this.user);
    if (user) {
      return JSON.parse(user);
    }
    return JSON.parse('{}');
  }

  removeUser() {
    localStorage.removeItem(this.user);
  }

  isAuthenticated(): boolean {
    return this.getUser().id !== undefined;
  }

  // Clear LocalStorage
  clear() {
    localStorage.clear();
  }
}
