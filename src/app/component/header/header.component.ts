import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  constructor(
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((result)=>{
      this.currentUser=result;

    });

  }

  logout(){
    return this.authService.logout();

  };

}
