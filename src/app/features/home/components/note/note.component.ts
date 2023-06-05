import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
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
    // This runs whenever the url changes. And when it does we want to fetch data for the new notebook
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
  
  // Title
  
  // - show update title input field or not
  editTitleMode = false;
  showTitleForm() { this.editTitleMode = !this.editTitleMode; }

  // - update : higher-order functions
  updateTitle(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id']

    const update = (field: HTMLInputElement) => {
      return service.updateNotebook(id, {title: field.value}).subscribe((notebook: Notebook) => {
        // Show successful alert
        this.dataSharingService.setAlert({
          title: 'Notebook was updated 💪',
          isSuccess: true,
          showAlert: true
        });
        // Update
        this.notebook$ = of(notebook);
        this.dataSharingService.setSidebarNotebook(notebook);
      });
    }
    return update;
  }

  // Description
  
  // - show update title input field or not
  editDescriptionMode = false;
  showDescriptionForm() { this.editDescriptionMode = !this.editDescriptionMode; }

  // - update : higher-order functions
  updateDescription(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id']

    const update = (field: HTMLInputElement) => {
      return service.updateNotebook(id, {description: field.value}).subscribe((notebook: Notebook) => {
        // Show successful alert
        this.dataSharingService.setAlert({
          title: 'Description was updated 💪',
          isSuccess: true,
          showAlert: true
        });
        // Update
        this.notebook$ = of(notebook);
      });
    }
    return update;
  }
  
  // Header
  // - show update title input field or not
  editNoteHeaderMode = false;
  showNoteHeaderForm() { this.editNoteHeaderMode = !this.editNoteHeaderMode; }
  // - update
  updateNoteHeader(field: HTMLInputElement) {
    console.log("Save New Note Header: ", field.value)
  }
  
  // - new note to data
  addNewNote(value: string, form: HTMLFormElement) {
    console.log("Save new note to the backend: ", value);
    console.log(form);
  }
  
}
