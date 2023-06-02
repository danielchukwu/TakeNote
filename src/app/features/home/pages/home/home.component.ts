import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Show Side Panel or Not (for smaller screen sizes tablets and mobiles)
  showSidePanel = false;
  toggleSidePanel() { this.showSidePanel = !this.showSidePanel; }
  
}
