import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentUser:any;
  allUsers:any;

  constructor(private authService: AuthService) {   }

  ngOnInit() {

      this.authService.getUsers().subscribe(users=>{
        this.allUsers=users;
      });
     }

     logout(){
      return this.authService.logout();
    };
    }


