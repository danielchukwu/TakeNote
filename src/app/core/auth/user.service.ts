import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiHostUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signup(data: NgForm):Observable<any> {
    return this.http.post(`${apiHostUrl}/auth/register`, data);
  }

  login(data: NgForm):Observable<any> {
    return this.http.post(`${apiHostUrl}/auth/authenticate`, data);
  }
}
