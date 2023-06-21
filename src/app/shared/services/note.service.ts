import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHostUrl } from 'src/environments/environment.development';
import { Note } from '../models/note';
import { catchError, retry, throwError } from 'rxjs';
import { DataSharingService } from './data-sharing.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // settings for re-sending requests when we get an error response
  retryCount = 5;
  delayInMilliseconds = 5000;
  
  constructor(private http: HttpClient, private dataSharingService: DataSharingService) {}

  // CREATE
  createNote(data: any){
    return this.http.post<Note>(`${apiHostUrl}/notes`, data).pipe(
      retry({ count: this.retryCount, delay: this.delayInMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Note couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Note couldn't be created. Retrying..."));
        }
      ),
    );
  }
  
  // READ
  getNotes(){
    return this.http.get<Note[]>(`${apiHostUrl}/notes`).pipe(
      retry({ count: this.retryCount, delay: this.delayInMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notes couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notes couldn't be created. Retrying..."));
        }
      ),
    );
  }
  
  getNote(id: String){
    return this.http.get<Note>(`${apiHostUrl}/notes/${id}`).pipe(
      retry({ count: this.retryCount, delay: this.delayInMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Note couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Note couldn't be created. Retrying..."));
        }
      ),
    );
  }

  // UPDATE
  updateNote(id: String, data: any | {} ){
    return this.http.put<Note>(`${apiHostUrl}/notes/${id}`, data).pipe(
      retry({ count: this.retryCount, delay: this.delayInMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notes couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notes couldn't be created. Retrying..."));
        }
      ),
    );
  }

  // DELETE
  deleteNote(id: String){
    return this.http.delete(`${apiHostUrl}/notes/${id}`).pipe(
      retry({ count: this.retryCount, delay: this.delayInMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notes couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notes couldn't be created. Retrying..."));
        }
      ),
    );
  }
}