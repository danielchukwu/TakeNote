import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  notebooks: Observable<Notebook[]> = this.notebook.getNotebooks();
  selectedCardId: any;
  subscription$: Subscription | undefined;

  constructor(
    private authService: AuthService, 
    private notebook: NotebookService, 
    private router: Router,
    private dataSharing: DataSharingService
  ) {}
  ngOnInit(): void {
    this.subscription$ = this.dataSharing.getSelectedSidebarNotebookId().subscribe((id) => {
      this.selectedCardId = id;
    });
  }
  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  setSelectedCardId(id: String){ this.selectedCardId = id; }

  // CRUD
  updateAvatar() {
    alert('Update users avatar! 🦜');
  }
  createNoteBook() {
    alert('Create new notebook! 🦜');
  }
  
  // logout
  logout(){
    this.authService.clear();
    this.router.navigate(['login']);
  }
}
