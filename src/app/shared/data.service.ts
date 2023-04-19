import { Injectable } from '@angular/core';

import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { post } from '../Interfaces/post';


@Injectable({
  providedIn: 'root'
})
export class DataService {



  userCollection : AngularFirestoreCollection;

  blogCollection : AngularFirestoreCollection<post>;

  displayName:string;
  email:string;
  title: string;
  content:string;


  constructor(private firestore:AngularFirestore) {
    this.userCollection=firestore.collection('users');
    this.blogCollection=firestore.collection('blogs');

    this.blogCollection = this.firestore.collection('blogs', ref =>
      ref.orderBy('published', 'desc')
    )

   }

  //  adding blog to the firebase using interface
   createPost(data: post) {
    this.blogCollection.add(data)
  }

  //get post for User
  getPostofUser(uid){
    //getting user's post with uid
    return this.firestore.collection('blogs',ref=> ref.where('authorId','==',uid)).valueChanges({idField:'id'});
  }


   //delete the posts from the user
   deletePost(id:string){
    return this.blogCollection.doc(id).delete();
   };

   //get single user from db
   getPost(userId){
    return this.blogCollection.doc(userId).get();
   };


  //get all users from db for admin
   getPosts(){
    return this.blogCollection.valueChanges({idField:'id'});
   };

  update(uid: string, post) {
   return this.blogCollection.doc(uid).update(post)
  }


}
