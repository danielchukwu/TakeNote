import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input() note: Note | any;

  constructor(private dataSharingService: DataSharingService){}
  
  updateNote() {
    this.dataSharingService.setNoteToUpdate(this.note);
    // Subscribe to the note to update so when it is updated we can update our current note card
    this.dataSharingService.getUpdatedNote().subscribe((note) => {
      if (note?.id === this.note.id && note?.body != this.note.body) {
        this.note = note;
      }
    });
  }
  
  deleteNote() {
    console.log('Delete Card: ', this.note);
  }
}
