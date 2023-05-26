import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  fieldsList = [
    {title: 'name', type: 'text'},
    {title: 'email', type: 'email'},
    {title: 'password', type: 'password'},
  ];
  
  isLogin = false;

  authenticate(form: any):void {
    if (this.isLogin) console.log("Implement Login 🔥")
    else console.log("Implement SignUp ⭐");

    console.log(form.name.value);
    console.log(form.email.value);
    console.log(form.password.value);
  }

  authenticateGoogle():void {
    if (this.isLogin)console.log("Implement Login Google 🔥")
    else console.log("Implement SignUp Google ⭐");
  }
}
