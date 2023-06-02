import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-note-card',
  templateUrl: './sidebar-note-card.component.html',
  styleUrls: ['./sidebar-note-card.component.css']
})
export class SidebarNoteCardComponent {
  @Input()
  item: any;
  showEditAndDeleteIconMode = false;
  

  showEditAndDeleteIcon() {
    this.showEditAndDeleteIconMode = !this.showEditAndDeleteIconMode;
  }
  
  delete() {
    alert('Delete Note Group: ');

  }
  
  update() {
    alert('Edit Note Group: ');
  }
}
