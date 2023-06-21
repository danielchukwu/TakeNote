import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apiHostUrl } from 'src/environments/environment.development';
import { Note } from '../models/note';
import { Notebook } from '../models/notebook';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  // settings for re-sending requests when we get an error response
  retryCount = 5;
  delayMilliseconds = 5000;

  constructor(private http:HttpClient, private dataSharingService: DataSharingService) {}

  // CREATE
  createNotebook(){
    return this.http.post<Notebook>(`${apiHostUrl}/notebooks`, {}).pipe(
      retry({ count: this.retryCount, delay: this.delayMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notebook couldn't be created", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notebook couldn't be created. Retrying..."));
        }
      ),
    );
  }
  
  // READ
  getNotebooks(){
    return this.http.get<Notebook[]>(`${apiHostUrl}/notebooks`).pipe(
      retry({ count: this.retryCount, delay: this.delayMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notebooks couldn't be fetched", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notebooks couldn't be fetched. Retrying..."));
        }
      ),
    );
  }
  
  getNotebook(id: String){
    return this.http.get<Notebook>(`${apiHostUrl}/notebooks/${id}`).pipe(
      retry({ count: this.retryCount, delay: this.delayMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notebook couldn't be fetched", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notebook couldn't be fetched. Retrying..."));
        }
      ),
    );
  }

  getNotes(id: String){
    return this.http.get<Note[]>(`${apiHostUrl}/notebooks/${id}/notes`).pipe(
      retry({ count: this.retryCount, delay: this.delayMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notes couldn't be fetched", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notes couldn't be fetched. Retrying..."));
        }
      ),
    );
  }

  // UPDATE
  updateNotebook(id: String, data: NgForm | {} ){
    return this.http.put<Notebook>(`${apiHostUrl}/notebooks/${id}`, data).pipe(
      retry({ count: this.retryCount, delay: this.delayMilliseconds }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notebook couldn't be updated", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notebook couldn't be updated. Retrying..."));
        }
      ),
    );
  }

  // DELETE
  deleteNotebook(id: String){
    return this.http.delete(`${apiHostUrl}/notebooks/${id}`).pipe(
      retry({ count: 5, delay: 10000 }),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err);
          this.dataSharingService.setAlert({title: "Notebook couldn't be deleted", isSuccess: false, showAlert: true});
          return throwError(() => new Error("Notebook couldn't be deleted. Retrying..."));
        }
      ),
    );
  }
}
