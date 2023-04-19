import { Component, OnInit } from '@angular/core';
import Toast from 'awesome-toast-component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string='';
  password:string='';

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }
  register(){
    if(this.email==''){
      new Toast(`Please Enter EmailID`, {
        position: 'top'});
        return;}

    if(this.password==''){
      new Toast(`Please Enter Password`, {
        position: 'top'});
        return;  }

    this.authService.registerUser(this.email,this.password);

    this.email='';
    this.password='';
  }

  loginwithGmail(){
    return this.authService.googleSignIn();
      };
}
