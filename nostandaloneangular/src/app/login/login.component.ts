import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onLogin() {
    alert('You are logged in!');
  }

  onForgotPassword() {
    alert('Your new password has been mailed to you');
  }

}
