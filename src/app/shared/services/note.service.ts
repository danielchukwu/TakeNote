import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apiHostUrl } from 'src/environments/environment.development';
import { Note } from '../models/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  constructor(private http:HttpClient) {}

  // CREATE
  createNote(data: any){
    console.log('Create Note:', data);
    console.log(`${apiHostUrl}/notes`);
    return this.http.post<Note>(`${apiHostUrl}/notes`, data);
  }
  
  // READ
  getNotes(){
    return this.http.get<Note[]>(`${apiHostUrl}/notes`);
  }
  
  getNote(id: String){
    return this.http.get<Note>(`${apiHostUrl}/notes/${id}`);
  }

  // UPDATE
  updateNote(id: String, data: NgForm | {} ){
    return this.http.put<Note>(`${apiHostUrl}/notes/${id}`, data);
  }

  // DELETE
  deleteNote(id: String){
    return this.http.delete(`${apiHostUrl}/notes/${id}`);
  }
}
