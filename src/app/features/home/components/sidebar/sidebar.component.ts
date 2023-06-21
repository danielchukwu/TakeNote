import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Notebook } from 'src/app/shared/models/notebook';
import { User } from 'src/app/shared/models/user';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { NotebookService } from 'src/app/shared/services/notebook.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User = this.authService.getUser();
  notebooks: Notebook[] = [];
  selectedNotebook: Notebook | undefined;
  showNotebookSkeleton = true;

  // subscription for fetching notebooks -
  // we don't use async pipe because we want to be able to add new notebooks to the
  // existing list which won't be possible otherwise if we used observables and async pipe
  sub1$: Subscription | undefined;

  // subscription for updating selectCardId
  sub2$: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private notebookService: NotebookService,
    private router: Router,
    private dataSharing: DataSharingService
  ) {}
  ngOnInit(): void {
    // get notebooks
    this.sub1$ = this.notebookService.getNotebooks().subscribe((notebooks) => {
      this.notebooks = notebooks;
      this.showNotebookSkeleton = false;
    });

    // updates the selected sidebar notebook id
    this.sub2$ = this.dataSharing
      .getSelectedNotebook()
      .subscribe((notebook) => {
        console.log('New Notebook Selected');
        this.selectedNotebook = notebook;
      });
  }
  ngOnDestroy(): void {
    // remove subscription
    this.sub1$?.unsubscribe();
    this.sub2$?.unsubscribe();
  }

  removeNotebook(id: String) {
    this.notebooks = this.notebooks.filter((notebook) => notebook.id !== id);
  }

  // CRUD
  updateAvatar() {
    alert('Update users avatar! 🦜');
  }
  createNoteBook() {
    this.sub1$ = this.notebookService
      .createNotebook()
      .subscribe((newNotebook) => {
        console.log(newNotebook);
        this.notebooks = [newNotebook, ...this.notebooks];
        // Open new notebook
        this.dataSharing.setSelectedNotebook(newNotebook);
        this.router.navigate(['n', newNotebook.id]);
      });
  }

  // logout
  logout() {
    this.authService.clear();
    this.router.navigate(['login']);
  }
}
