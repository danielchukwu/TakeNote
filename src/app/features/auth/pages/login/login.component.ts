import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: '../sign-up/sign-up.component.html',
  styleUrls: ['../sign-up/sign-up.component.css']
})

// This 
export class LoginComponent {
  fieldsList = [
    {title: 'email', type: 'email'},
    {title: 'password', type: 'password'},
  ];

  isLogin = true;

  authenticate(form: any):void {
    if (this.isLogin) console.log("Implement Login 🔥")
    else console.log("Implement SignUp ⭐");
  }

  authenticateGoogle():void {
    if (this.isLogin)console.log("Implement Login Google 🔥")
    else console.log("Implement SignUp Google ⭐");
  }
}
