import {Component, EventEmitter, NgZone, Output, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Note } from 'src/app/shared/models/note';
import { NoteService } from 'src/app/shared/services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent implements OnInit, OnDestroy {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Output() createNoteEvent = new EventEmitter();
  @Output() updateNoteEvent = new EventEmitter();
  updateNote: Note | undefined;
  inputValue = "";
  sub1$: Subscription[] = [];

  constructor(
    private _ngZone: NgZone,
    private noteService: NoteService,
    private dataSharingService: DataSharingService,
  ) {}
  ngOnInit(): void {
    // use dataSharingService to get any note to be updated
    this.dataSharingService.setNoteToUpdate(undefined);
    const sub$ = this.dataSharingService.getNoteToUpdate().subscribe((note) => {
      if (note){
        this.updateNote = note;
        this.inputValue = `${note?.body}`;
      }
    })
    this.sub1$.push(sub$);
    // subscribe to the note to be displayed and display it inside our textfield
    // on form submission update the note instead of creating a new one
  }
  ngOnDestroy(): void {
    // destroy subscriptions
    this.sub1$.map((sub) => { sub.unsubscribe(); });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submit(inputField: HTMLTextAreaElement) {
    // create new note
    if (this.updateNote === undefined){
      this.createNoteEvent.emit(inputField.value);
      this.inputValue="";
      this.autosize.resizeToFitContent(true);  // reset textarea back to 1 line
      return;
    }
    // update existing note
    const updatedNote = {body: this.inputValue.trim()};
    this.noteService.updateNote(this.updateNote.id, updatedNote).subscribe((noteUpdated) => {
      this.dataSharingService.setUpdatedNote(noteUpdated);
    });
    
    this.updateNote = undefined;
    this.inputValue="";
    this.autosize.resizeToFitContent(true);  // reset textarea back to 1 line
  }
}