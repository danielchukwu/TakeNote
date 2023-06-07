import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notebook } from '../models/notebook';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private selectedSidebarNotebookId = new BehaviorSubject<String>('');
  private alertSubject = new BehaviorSubject<{
    title: String; 
    isSuccess: boolean;
    showAlert: boolean;
  }>({ title: '', isSuccess: false, showAlert: false });
  private sidebarNotebookSubject = new BehaviorSubject<Notebook | undefined>(undefined);
  // Subjects for notes
  private noteToUpdateSubject = new BehaviorSubject<Note | undefined>(undefined);
  private updatedNoteSubject = new BehaviorSubject<Note | undefined>(undefined);

  constructor() {}

  // Sidebar Notebook Id - reads and updates the selected sidebar notebook id
  getSelectedSidebarNotebookId() {
    return this.selectedSidebarNotebookId.asObservable();
  }
  setSelectedSidebarNotebookId(id: String) {
    this.selectedSidebarNotebookId.next(id);
  }

  // Alert - displays the alert card pop up notification
  getAlert() {
    return this.alertSubject.asObservable();
  }
  setAlert(data: { title: String; isSuccess: boolean, showAlert: boolean}) {
    this.alertSubject.next(data);
  }
  
  // Sidebar Title - allows updating of sidebar title
  getSidebarNotebook() {
    return this.sidebarNotebookSubject.asObservable();
  }
  setSidebarNotebook(data: Notebook) {
    this.sidebarNotebookSubject.next(data);
  }
  
  // Sidebar Title - allows updating of sidebar title
  getNoteToUpdate() { return this.noteToUpdateSubject.asObservable(); }
  setNoteToUpdate(note: Note | undefined) { this.noteToUpdateSubject.next(note); }

  getUpdatedNote() { return this.updatedNoteSubject.asObservable(); }
  setUpdatedNote(note: Note | undefined) { this.updatedNoteSubject.next(note); }
}
