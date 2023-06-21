import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { apiHostUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private dataSharingService: DataSharingService
  ) {}

  signup(data: NgForm): Observable<any> {
    return this.http.post(`${apiHostUrl}/auth/register`, data).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        // 409 - request conflict / user with email already exists
        if (err.status === 409) {
          this.dataSharingService.setAlert({
            title: 'User with Email Already Exists',
            isSuccess: false,
            showAlert: true,
          });
          return throwError(() => new Error('User with Email Already Exists'));
        }
        this.dataSharingService.setAlert({
          title: 'Invalid Credentials',
          isSuccess: false,
          showAlert: true,
        });
        return throwError(() => new Error('Invalid Credentials'));
      })
    );
  }

  login(data: NgForm): Observable<any> {
    return this.http.post(`${apiHostUrl}/auth/authenticate`, data).pipe(
      catchError((err: HttpErrorResponse) => {
        this.dataSharingService.setAlert({
          title: 'Email or Password is Incorrect',
          isSuccess: false,
          showAlert: true,
        });
        return throwError(() => new Error('Email or Password is Incorrect'));
      })
    );
  }
}
