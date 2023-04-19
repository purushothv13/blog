import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Toast from 'awesome-toast-component';
import { doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { post } from 'src/app/Interfaces/post';

import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";

import { Storage } from '@angular/fire/storage'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title:string;
  content:string;
  image:any;
  currentUser:any;

  tempImgUrl:any;


  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  postList: any;

  blog:post;


  showAdd:boolean;
  showUpdate:boolean;
  formvalue: FormGroup;
   file: any;


  constructor(
        private dataservice:DataService,
        private authService:AuthService,
        private route: ActivatedRoute,
        private angularfirestorage: AngularFireStorage,
        private afs:AngularFirestore,
        private formbuilder : FormBuilder,
        private firestore:Firestore,
        public storage:Storage
    ) { }

  ngOnInit() {
    this.formvalue=new FormGroup({
      title:new FormControl(),
      content:new FormControl(),
    });

    this.formvalue = this.formbuilder.group({
      title : ['', Validators.required],
      content:['', Validators.required],
    })

    this.authService.currentUser.subscribe((result)=>{
      this.currentUser=result;

      //method for calling user blog with uid
      this.getPostofCurrentUser();
    });

  }
  get IsCheck() {
    return this.formvalue.controls;
  }

  // current user uid with post
  private getPostofCurrentUser() {
    this.dataservice.getPostofUser(this.currentUser.uid).subscribe(item=>{
      this.postList=item;
    })
    this.showAdd=true;
    this.showUpdate=false;
   }


  createPost(){

    const postData = {
      author: this.authService.authState.displayName || this.authService.authState.email,
      authorId: this.authService.currentUserId,
      content: this.formvalue.value.content,
      image: this.tempImgUrl,
      published: new Date(),
      title: this.formvalue.value.title
    }
    this.dataservice.createPost(postData)
    this.title
    this.content
    this.image
    new Toast(`Posted Successfully..!!!`, {
             position: 'top'});
             this.formvalue.reset();

   }

  // uploading Image to the firebase storage

  chooseFile(event:any){
    this.file = event.target.files[0] ;
    console.log(this.file)
  }
  uploadImg() {
    const metadata = {
      contentType: 'image/jpeg'
    };

    // storage reference - folder--file

    const storageRef = ref(this.storage, 'uploads/'+ this.file+'.jpeg')
    const uploadTask = uploadBytes(storageRef, this.file,metadata);

    uploadTask.then((res)=>{
      console.log(res)
      getDownloadURL(res.ref).then(result=>{
        console.log(result)

        this.tempImgUrl=result;
      })
    })
   }


   delete(id){
  this.dataservice.deletePost(id).then((res)=>{
  new Toast(`Post deleted`, {
    position: 'top'
});
  });
   }

   onEdit(item:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.blog=item;

   this.formvalue.controls['title'].setValue(item.title);
   this.formvalue.controls['content'].setValue(item.content);

   }

   updatePost(){
   this.blog.title=this.formvalue.value.title;
   this.blog.content=this.formvalue.value.content;

   this.dataservice.update(this.blog.id,this.blog).then(res=>{

    alert("Updated Successfully");

      this.formvalue.reset();
      this.getPostofCurrentUser();
   })
   }

  }


