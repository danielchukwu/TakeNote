import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private selectedSidebarNotebookId = new BehaviorSubject<String>('');

  constructor() { }

  // SETTER AND GETTER - reads and updates the selected sidebar notebook id
  getSelectedSidebarNotebookId(){
    return this.selectedSidebarNotebookId.asObservable();
  }
  setSelectedSidebarNotebookId(id: String){
    this.selectedSidebarNotebookId.next(id);
  }
}
