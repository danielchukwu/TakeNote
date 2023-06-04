import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/auth/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  fieldsList = [
    {title: 'name', type: 'text'},
    {title: 'email', type: 'email'},
    {title: 'password', type: 'password'},
  ];
  
  isLogin = false;

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router
    ){}

  authenticate(data: NgForm):void {
    this.userService.signup(data).subscribe(
      (response) => {
        console.log(response);
        this.authService.setToken(response.token);
        this.authService.setUser(response.user);
        this.router.navigate([""]);
      }
    )
  }

  authenticateGoogle():void {
    if (this.isLogin)console.log("Implement Login Google 🔥")
    else console.log("Implement SignUp Google ⭐");
  
  }
}
