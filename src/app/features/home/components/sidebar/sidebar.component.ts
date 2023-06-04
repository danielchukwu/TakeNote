import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Notebook } from 'src/app/shared/models/notebook';
import { NotebookService } from 'src/app/shared/services/notebook.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user: any = this.authService.getUser();
  notebooks: Observable<Notebook[]> = this.notebook.getNotebooks();

  constructor(private authService: AuthService, private notebook: NotebookService, private router: Router) {}

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
