import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.css']
})
export class SquareButtonComponent {
  @Input() route: string[] = [''];
  @Input() isOutline=false;
  @Input() text='click me';
}
