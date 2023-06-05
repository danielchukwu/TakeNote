import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notebook } from 'src/app/shared/models/notebook';


@Component({
  selector: 'app-sidebar-note-card',
  templateUrl: './sidebar-note-card.component.html',
  styleUrls: ['./sidebar-note-card.component.css']
})
export class SidebarNoteCardComponent {
  @Input() notebook: Notebook | undefined;
  @Input() isSelected = false;
  @Output() selectCard = new EventEmitter();
  showEditAndDeleteIconMode = false;
  subscription: Subscription | undefined;
  
  constructor(private router: Router, private route: ActivatedRoute){}

  showEditAndDeleteIcon() {
    this.showEditAndDeleteIconMode = !this.showEditAndDeleteIconMode ;
  }

  openNotebook(){
    // output event
    this.selectCard.emit(this.notebook?.id);
    // navigate to new notebook rout
    this.router.navigate(['n', this.notebook?.id]);
  }
  
  delete() {
    alert('Delete Note Group: ');
  }
  
  update() {
    alert('Edit Note Group: ');
  }
}
