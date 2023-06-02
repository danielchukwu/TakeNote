import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiHostUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: any):Observable<any> {
    console.log("Service Ran");
    console.log(data);
    return this.http.post(`${apiHostUrl}/auth/register`, data);
  }
}
