import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, map } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Note } from 'src/app/shared/models/note';
import { Notebook } from 'src/app/shared/models/notebook';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { NotebookService } from 'src/app/shared/services/notebook.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  notebook$: Observable<Notebook> = this.notebookService.getNotebook(this.route.snapshot.params['id']);
  sub1$: Subscription[] = [];
  editTitleMode = false;
  editDescriptionMode = false;
  noteToUpdate: Note | undefined;

  constructor(
    private notebookService: NotebookService, 
    private noteService: NoteService, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}
  
  ngOnInit(): void {
    // This runs whenever the url changes. 
    // And when it does we want to fetch data for the new notebook
    const urlChangeListenerSubscription$ = 
      this.route.paramMap.subscribe((paramMap) => {
        const id = this.route.snapshot.params['id'];
        // Get notebooks notes list
        this.notebookService
          .getNotes(this.route.snapshot.params['id'])
          .subscribe((notesList) => { this.notes = notesList})
        this.notebook$ = this.notebookService.getNotebook(id);
        // Update Selected Sidebar Notebook
        this.dataSharingService.setSelectedSidebarNotebookId(id);
      });
    this.sub1$?.push(urlChangeListenerSubscription$);
  }
  ngOnDestroy() {
    // Unsubscribe from all the subscriptions
    this.sub1$?.map((sub) => { sub.unsubscribe(); });
  }

  // NOTE
  
  // - Create
  createNote(value: String) {
    console.log(this.route.snapshot.params['id']);

    // add note
    if (value.length > 0){
      const sub$ = this.noteService.createNote({
        body: value,
        notebookId: this.route.snapshot.params['id'],
        userId: this.authService.getUser().id
      }).subscribe((newNote) => { this.notes = [newNote, ...this.notes] });

      this.sub1$.push(sub$);
    }
  }

  // NOTEBOOK
  
  // - Title
  //   show update title input field or not
  showTitleForm() { this.editTitleMode = !this.editTitleMode; }
  //   Update : higher-order functions
  updateTitle(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id']

    const update = (field: HTMLInputElement) => {
      // Check Validity
      if (field.value.trim().length === 0 ){
        this.dataSharingService.setAlert({ title: "Notebook description can't be empty 😕", isSuccess: false, showAlert: true});
        return;
      }

      return service.updateNotebook(id, {title: field.value.trim()}).subscribe((notebook: Notebook) => {
        // Show successful alert
        this.dataSharingService.setAlert({ title: 'Notebook was updated 💪', isSuccess: true, showAlert: true});
        // Update
        this.notebook$ = of(notebook);
        this.dataSharingService.setSidebarNotebook(notebook);
      });
    }
    return update;
  }

  // - Description
  //   show update description input field or not
  showDescriptionForm() { this.editDescriptionMode = !this.editDescriptionMode; }
  //   update : higher-order functions
  updateDescription(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id']

    const update = (field: HTMLInputElement) => {
      // Check Validity
      if (field.value.trim().length === 0 ){
        this.dataSharingService.setAlert({ title: "Notebook description can't be empty 😕", isSuccess: false, showAlert: true});
        return;
      }

      return service.updateNotebook(id, {description: field.value.trim()}).subscribe((notebook: Notebook) => {
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
}
