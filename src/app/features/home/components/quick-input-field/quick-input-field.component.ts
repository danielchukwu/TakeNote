import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quick-input-field',
  templateUrl: './quick-input-field.component.html',
  styleUrls: ['./quick-input-field.component.css']
})
export class QuickInputFieldComponent {
  @Input() title = '';
  @Input() styles = "";
  @Input() save = Function();
  @Output() closeInputField = new EventEmitter();

  close() { 
    this.closeInputField.emit();
  }
}
