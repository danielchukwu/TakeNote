import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dataSharingService: DataSharingService){}
  ngOnInit(): void {
    this.dataSharingService.setCloseSidebarPanel(this.toggleSidePanelOff());
  }

  // Show Side Panel or Not (for smaller screen sizes tablets and mobiles)
  showSidePanel = false;
  toggleSidePanel() { this.showSidePanel = !this.showSidePanel; }

  // Mobile view only
  // this function is passed down the component tree and it is used to close the sidebar panel when the child 
  toggleSidePanelOff(){
    const object = this;
    const toggleSidePanel = () => object.showSidePanel = false;
    return toggleSidePanel;
  }
}
