import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSidePanel = false;
  headerTitle = 'Home';

  constructor(private authService: AuthService, private dataSharingService: DataSharingService){}
  ngOnInit(): void {
    this.dataSharingService.setCloseSidebarPanel(this.toggleSidePanelOff());
    // Set header title whenever it is updated - courtesy of BehaviourSubject
    this.dataSharingService.getSelectedNotebook().subscribe((notebook) => {
      this.headerTitle = notebook !== undefined ? `${notebook.title}` : 'Home' ;
    });
  }

  // Show Side Panel or Not (for smaller screen sizes tablets and mobiles)
  toggleSidePanel() { this.showSidePanel = !this.showSidePanel; }

  // Mobile view only
  // this function is passed down the component tree and it is used to close the sidebar panel when the child 
  toggleSidePanelOff(){
    const object = this;
    const toggleSidePanel = () => object.showSidePanel = false;
    return toggleSidePanel;
  }

  isAuthenticated(): boolean { return this.authService.isAuthenticated(); }
}
