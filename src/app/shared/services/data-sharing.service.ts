import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notebook } from '../models/notebook';

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

  constructor() {}

  // SETTER AND GETTER - reads and updates the selected sidebar notebook id
  getSelectedSidebarNotebookId() {
    return this.selectedSidebarNotebookId.asObservable();
  }
  setSelectedSidebarNotebookId(id: String) {
    this.selectedSidebarNotebookId.next(id);
  }

  // SETTER AND GETTER - displays the alert card pop up notification
  getAlert() {
    return this.alertSubject.asObservable();
  }
  setAlert(data: { title: String; isSuccess: boolean, showAlert: boolean}) {
    this.alertSubject.next(data);
  }
  
  // SETTER AND GETTER - allows updating of sidebar notification title
  getSidebarNotebookSubject() {
    return this.sidebarNotebookSubject.asObservable();
  }
  setSidebarNotebook(data: Notebook) {
    this.sidebarNotebookSubject.next(data);
  }
}
