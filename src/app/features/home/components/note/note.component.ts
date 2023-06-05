import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/shared/models/note';
import { Notebook } from 'src/app/shared/models/notebook';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { NotebookService } from 'src/app/shared/services/notebook.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {
  notes$: Observable<Note[]> = this.notebookService.getNotes(this.route.snapshot.params['id']);
  notebook$: Observable<Notebook> = this.notebookService.getNotebook(this.route.snapshot.params['id']);
  subscription$: Subscription | undefined;

  constructor(
    private notebookService: NotebookService, 
    private route: ActivatedRoute, 
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}
  ngOnInit(): void {
    // This runs whenever the url changes. And when it does we want to fetch data for the 
    this.subscription$ = this.route.paramMap.subscribe((paramMap) => {
      const id = this.route.snapshot.params['id'];
      
      this.notes$ = this.notebookService.getNotes(id);
      this.notebook$ = this.notebookService.getNotebook(id);
      // Update Selected Sidebar Notebook
      this.dataSharingService.setSelectedSidebarNotebookId(id);
    })
  }
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  // CRUD

  // Note Title - This shows the edit form or not and shows the title or not
  editTitleMode = false;
  showTitleForm() { this.editTitleMode = !this.editTitleMode; }
  updateTitle(field: HTMLInputElement) {
    console.log("Save New Title: ", field.value)
  }
  
  // Note Header Title - This shows the edit form for the note header
  editNoteHeaderMode = false;
  showNoteHeaderForm() { this.editNoteHeaderMode = !this.editNoteHeaderMode; }
  updateNoteHeader(field: HTMLInputElement) {
    console.log("Save New Note Header: ", field.value)
  }
  
  // ADD - new note to data
  addNewNote(value: string, form: HTMLFormElement) {
    console.log("Save new note to the backend: ", value);
    console.log(form);
  }
  
}
