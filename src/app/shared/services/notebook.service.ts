import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apiHostUrl } from 'src/environments/environment.development';
import { User } from '../models/user';
import { Note } from '../models/note';
import { Notebook } from '../models/notebook';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(private http:HttpClient, private authService: AuthService) {}

  // CREATE
  createNotebook(){
    return this.http.post<Notebook>(`${apiHostUrl}/notebooks`, {});
  }
  
  // READ
  getNotebooks(){
    return this.http.get<Notebook[]>(`${apiHostUrl}/notebooks`);
  }
  
  getNotebook(id: String){
    return this.http.get<Notebook>(`${apiHostUrl}/notebooks/${id}`);
  }

  getNotes(id: String){
    return this.http.get<Note[]>(`${apiHostUrl}/notebooks/${id}/notes`);
  }

  // UPDATE
  updateNotebook(id: String, data: NgForm | {} ){
    return this.http.put<Notebook>(`${apiHostUrl}/notebooks/${id}`, data);
  }

  // DELETE
  deleteNotebook(id: String){
    return this.http.delete(`${apiHostUrl}/notebooks/${id}`);
  }
}
