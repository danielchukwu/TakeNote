import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Note } from 'src/app/shared/models/note';
import { Notebook } from 'src/app/shared/models/notebook';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { NotebookService } from 'src/app/shared/services/notebook.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  notebook$: Observable<Notebook | undefined> = new Observable();
  sub1$: Subscription[] = [];
  editTitleMode = false;
  editDescriptionMode = false;
  noteToUpdate: Note | undefined;
  showNotebookSkeleton = true;
  showNoteSkeleton = true;

  constructor(
    private notebookService: NotebookService,
    private noteService: NoteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    // First time this page loads, fetch the notebook from the database and set the
    // selectedNotebook using our dataSharingService. So that whichever component needs this data can get it in real time
    const sub$ = this.notebookService
      .getNotebook(this.route.snapshot.params['id'])
      .subscribe((notebook) => {
        this.dataSharingService.setSelectedNotebook(notebook);
        this.showNotebookSkeleton = false;
      });
    // This runs whenever the url changes.
    // And when it does we want to fetch data for the new notebook
    const urlChangeListenerSubscription$ = this.route.paramMap.subscribe(
      (paramMap) => {
        const id = this.route.snapshot.params['id'];
        // Get notebooks notes list
        this.notebookService.getNotes(id).subscribe((notesList) => {
          this.notes = notesList;
          this.showNoteSkeleton = false;
        });

        // Update Selected Sidebar Notebook
        this.notebook$ = this.dataSharingService.getSelectedNotebook();
      }
    );
    this.sub1$?.push(sub$);
    this.sub1$?.push(urlChangeListenerSubscription$);
  }
  ngOnDestroy() {
    // Unsubscribe from all the subscriptions
    this.sub1$?.map((sub) => {
      sub.unsubscribe();
    });
  }

  removeNotebook(id: String) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  // NOTE

  // - Create
  createNote(value: String) {
    console.log(this.route.snapshot.params['id']);

    // add note
    if (value.trim().length > 0 || value.trim() !== '') {
      const sub$ = this.noteService
        .createNote({
          body: value.trim(),
          notebookId: this.route.snapshot.params['id'],
          userId: this.authService.getUser().id,
        })
        .subscribe((newNote) => {
          this.notes = [newNote, ...this.notes];
        });

      this.sub1$.push(sub$);
    }
  }

  // NOTEBOOK

  // - Title
  //   show update title input field or not
  showTitleForm() {
    this.editTitleMode = !this.editTitleMode;
  }
  //   Update : higher-order functions
  updateTitle(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id'];
    let title: String | undefined;
    const sub$ = this.notebook$.subscribe((notebook) => {
      title = notebook?.title;
    });
    this.sub1$.push(sub$);

    const update = (field: HTMLInputElement) => {
      // Check Validity
      if (field.value.trim().length === 0) {
        this.dataSharingService.setAlert({
          title: "Notebook description can't be empty 😕",
          isSuccess: false,
          showAlert: true,
        });
        return;
      }
      // Check that title to be updated actually changed
      if (title === field.value.trim()) {
        return;
      }

      return service
        .updateNotebook(id, { title: field.value.trim() })
        .subscribe((notebook: Notebook) => {
          // Show successful alert
          this.dataSharingService.setAlert({
            title: 'Notebook was updated 💪',
            isSuccess: true,
            showAlert: true,
          });
          // Update
          this.notebook$ = of(notebook);
          this.dataSharingService.setSelectedNotebook(notebook);
        });
    };
    return update;
  }

  // - Description
  //   show update description input field or not
  showDescriptionForm() {
    this.editDescriptionMode = !this.editDescriptionMode;
  }
  //   update : higher-order functions
  updateDescription(): Function {
    const service = this.notebookService;
    const id = this.route.snapshot.params['id'];
    let description: String | undefined;
    const sub$ = this.notebook$.subscribe((notebook) => {
      description = notebook?.description;
    });
    this.sub1$.push(sub$);

    const update = (field: HTMLInputElement) => {
      // Check Validity
      if (field.value.trim().length === 0) {
        this.dataSharingService.setAlert({
          title: "Notebook description can't be empty 😕",
          isSuccess: false,
          showAlert: true,
        });
        return;
      }

      // Check that title to be updated actually changed
      if (description === field.value.trim()) {
        return;
      }

      return service
        .updateNotebook(id, { description: field.value.trim() })
        .subscribe((notebook: Notebook) => {
          // Show successful alert
          this.dataSharingService.setAlert({
            title: 'Description was updated 💪',
            isSuccess: true,
            showAlert: true,
          });
          // Update
          this.notebook$ = of(notebook);
        });
    };
    return update;
  }
}
