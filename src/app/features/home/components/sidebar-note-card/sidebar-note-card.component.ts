import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar-note-card',
  templateUrl: './sidebar-note-card.component.html',
  styleUrls: ['./sidebar-note-card.component.css']
})
export class SidebarNoteCardComponent {
  @Input() notebook: any;
  isSelected = false;
  showEditAndDeleteIconMode = false;
  subscription: Subscription | undefined;
  
  constructor(private router: Router, private route: ActivatedRoute){}

  showEditAndDeleteIcon() {
    this.showEditAndDeleteIconMode = !this.showEditAndDeleteIconMode ;
  }

  openNotebook(){
    this.router.navigate(['n', this.notebook.id], { state: {notebook: this.notebook}});
  }
  
  delete() {
    alert('Delete Note Group: ');
  }
  
  update() {
    alert('Edit Note Group: ');
  }
}
