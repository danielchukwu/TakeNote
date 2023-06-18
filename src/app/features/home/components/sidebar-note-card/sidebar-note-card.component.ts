import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notebook } from 'src/app/shared/models/notebook';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { NotebookService } from 'src/app/shared/services/notebook.service';


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
  @Output() removeNotebookId = new EventEmitter();
  sub1$: Subscription[] = [];

  
  constructor(
    private router: Router, 
    private notebookService: NotebookService,
    private dataSharingService: DataSharingService,
    ){}
  ngOnInit(): void {
    // Update sidebar notebook title when a change is emitted 
    // from the notes page or anywhere across our application
    this.dataSharingService.getSelectedNotebook().subscribe((notebook) => {
      if (notebook != undefined && this.notebook?.id == notebook.id){
        this.notebook = notebook ?? this.notebook;
      }
    });
  }

  showEditAndDeleteIcon() {
    this.showEditAndDeleteIconMode = !this.showEditAndDeleteIconMode ;
  }
  
  showTitleForm(){ this.showUpdateTitleForm = !this.showUpdateTitleForm; }

  openNotebook(){
    // output event
    this.selectCard.emit(this.notebook?.id);
    // navigate to new notebook rout
    this.router.navigate(['n', this.notebook?.id]);

    // Set newly selectedNotebook
    this.dataSharingService.setSelectedNotebook(this.notebook);
    // if we are on a mobile view toggle the sidebar to false
    // this will close the sidebar panel from view
    this.dataSharingService.getCloseSidebarPanel()();
  }
  
  delete() {
    this.notebookService.deleteNotebook(`${this.notebook?.id}`).subscribe((result) => {
      this.dataSharingService.setAlert({title: 'Notebook deleted successfully', isSuccess: true, showAlert: true});
      this.router.navigate(['']);
      this.removeNotebookId.emit(`${this.notebook?.id}`);
    });
  }
}
