import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showMenu = false;
  @Input() showAuth = true;

  constructor(private authService: AuthService){}

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  displayMenu(shouldShow: boolean) {
    this.showMenu = shouldShow;
  }
}


