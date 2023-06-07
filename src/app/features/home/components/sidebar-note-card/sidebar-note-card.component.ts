import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Notebook } from 'src/app/shared/models/notebook';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';


@Component({
  selector: 'app-sidebar-note-card',
  templateUrl: './sidebar-note-card.component.html',
  styleUrls: ['./sidebar-note-card.component.css']
})
export class SidebarNoteCardComponent implements OnInit {
  @Input() notebook: Notebook | undefined;
  @Input() isSelected = false;
  @Output() selectCard = new EventEmitter();
  showEditAndDeleteIconMode = false;
  showUpdateTitleForm = false;

  
  constructor(
    private router: Router, 
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute, 
    ){}
  ngOnInit(): void {
    // Update sidebar notebook title when a change is emitted 
    // from the notes page or anywhere across our application
    this.dataSharingService.getSidebarNotebook().subscribe((notebook) => {
      if (notebook != undefined && this.notebook?.id == notebook.id){
        this.notebook = notebook ?? this.notebook;
      }
      
    });
  }

  showEditAndDeleteIcon() {
    this.showEditAndDeleteIconMode = !this.showEditAndDeleteIconMode ;
  }
  
  showTitleForm(){ this.showUpdateTitleForm = !this.showUpdateTitleForm}

  openNotebook(){
    // output event
    this.selectCard.emit(this.notebook?.id);
    // navigate to new notebook rout
    this.router.navigate(['n', this.notebook?.id]);
  }
  
  delete() {
    alert('Delete Note Group: ');
  }
  
}
