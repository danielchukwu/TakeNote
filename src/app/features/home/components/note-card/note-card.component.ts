import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input()
  note: any;
  
  delete() {
    console.log('Delete Card: ', this.note);
  }
  
  edit() {
    console.log('Edit Card: ', this.note);
  }
}
