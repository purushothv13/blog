import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Toast from 'awesome-toast-component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-users-blog',
  templateUrl: './users-blog.component.html',
  styleUrls: ['./users-blog.component.css']
})
export class UsersBlogComponent implements OnInit {

  posts:any;
  userId: any;
  selectedUser: any;
  user: any;
  constructor( private dataservice:DataService,private activateRoute:ActivatedRoute) { }


  ngOnInit() {
    const userid = this.activateRoute.snapshot.paramMap.get('id');

    this.dataservice.getPost(userid).subscribe(user => {
      this.user = user;

     });
     this.dataservice.getPostofUser(userid).subscribe(posts => {
      this.posts = posts;
     });
  };

  delete(id){
    this.dataservice.deletePost(id).then((res)=>{
    new Toast(`Post deleted`, {
      position: 'top'
  });
    });
     }
}
