import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: any;
  currentUser: any;

  constructor( private dataservice:DataService) { }

  ngOnInit(): void {

      //method for calling user blog with uid
      this.getPostofUser();
  }


  // current user uid with post
  private getPostofUser() {
    this.dataservice.getPosts().subscribe(item=>{
      this.posts=item;
    })
   }
  }


