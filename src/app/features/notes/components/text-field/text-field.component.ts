import {Component, EventEmitter, Input, NgZone, Output, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent {
  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  // pass data entered back to parent component when submitted
  @Output() onSubmit = new EventEmitter();
  inputValue = "";

  submit() {
    this.onSubmit.emit(this.inputValue);
    this.inputValue="";

    // Rest text area back to 1 line
    this.autosize.resizeToFitContent(true);
  }
}