import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  updateAvatar() {
    alert('Update users avatar! 🦜');
  }

  createNoteBook() {
    alert('Create new notebook! 🦜');
  }
}
