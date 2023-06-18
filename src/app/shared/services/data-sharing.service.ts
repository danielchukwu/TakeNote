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
  private selectedNotebookSubject = new BehaviorSubject<Notebook | undefined>(undefined);
  private toggleSidebarSubject = new BehaviorSubject<Function>(() => {});
  private noteToUpdateSubject = new BehaviorSubject<Note | undefined>(undefined);  // note subject
  private updatedNoteSubject = new BehaviorSubject<Note | undefined>(undefined);   // note subject
  private headerTitleSubject = new BehaviorSubject<String>('Home');


  constructor() {}

  // Sidebar Notebook Id - reads and updates the selected sidebar notebook id
  // getSelectedSidebarNotebookId() { return this.selectedSidebarNotebookId.asObservable(); }
  // setSelectedSidebarNotebookId(id: String) { this.selectedSidebarNotebookId.next(id); }

  // Alert - displays the alert card pop up notification
  getAlert() { return this.alertSubject.asObservable(); }
  setAlert(data: { title: String; isSuccess: boolean, showAlert: boolean}) { this.alertSubject.next(data); }
  
  // Sidebar Title - allows updating of sidebar title
  getSelectedNotebook() { return this.selectedNotebookSubject.asObservable(); }
  setSelectedNotebook(data: Notebook| undefined) { this.selectedNotebookSubject.next(data); }
  
  // Sidebar Title - allows updating of sidebar title
  getNoteToUpdate() { return this.noteToUpdateSubject.asObservable(); }
  setNoteToUpdate(note: Note | undefined) { this.noteToUpdateSubject.next(note); }

  getUpdatedNote() { return this.updatedNoteSubject.asObservable(); }
  setUpdatedNote(note: Note | undefined) { this.updatedNoteSubject.next(note); }

  //  Side Panel for Mobile - this sets and gets the function that can be used to update the side panel
  getCloseSidebarPanel() { return this.toggleSidebarSubject.getValue(); }
  setCloseSidebarPanel(myFunc: Function) { this.toggleSidebarSubject.next(myFunc); }

  // Note Screen - helps set and get the header title
  getHeaderTitle() { return this.headerTitleSubject.getValue(); }
  setHeaderTitle(value: String) { this.headerTitleSubject.next(value); }
}
