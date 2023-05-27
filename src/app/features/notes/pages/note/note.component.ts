import { Component } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  
  // NOTE TITLE
  // This shows the edit form or not and shows the title or not
  editTitleMode = false;
  showTitleForm() { this.editTitleMode = !this.editTitleMode; }

  updateTitle(field: HTMLInputElement) {
    console.log("Save New Title: ", field.value)
  }
  
  // NOTE HEADER TITLE
  // This shows the edit form for the note header
  editNoteHeaderMode = false;
  showNoteHeaderForm() { this.editNoteHeaderMode = !this.editNoteHeaderMode; }

  updateNoteHeader(field: HTMLInputElement) {
    console.log("Save New Note Header: ", field.value)
  }
  
  
  addNewNote(value: string, form: HTMLFormElement) {
    console.log("Save new note to the backend: ", value);
    console.log(form);
  }
}
