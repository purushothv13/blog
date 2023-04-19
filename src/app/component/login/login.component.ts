import { Component, OnInit } from '@angular/core';
import Toast from 'awesome-toast-component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string='';
  password: string='';

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    if(this.email==''){
      new Toast(`Please Enter EmailID`, {
        position: 'top'});
        return; }

    if(this.password==''){
      new Toast(`Please Enter Password`, {
        position: 'top'});
        return; }

    this.authService.login(this.email,this.password);

    this.email='';
    this.password='';
  };


  loginwithGmail(){
    return this.authService.googleSignIn();
      };
}
