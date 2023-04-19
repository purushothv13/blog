import { Injectable } from '@angular/core';

import Toast from 'awesome-toast-component';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { blogUser } from '../Interfaces/users';
import { first, firstValueFrom, Observable } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection :AngularFirestoreCollection;

  user:Observable<blogUser>;
  currentUser: any;

  authState: any = null

  constructor(
    private firestore:AngularFirestore ,
    private auth:AngularFireAuth ,
    private router:Router

) {
  //gets data from users collection
  this.userCollection=firestore.collection('users');

//Gives the current User profile
  this.currentUser= this.auth.authState.pipe(
    first()
  )

  this.auth.authState.subscribe(data => this.authState = data)
}

//gets the current user Id
get currentUserId(): string {
  return this.isAuthenticated ? this.authState.uid : null
}

//Register with firebase
registerUser (email:string,password:string){
  this.auth.createUserWithEmailAndPassword(email,password).then((result)=>{

    console.log(result)
var newUser:blogUser={  email:email,isAdmin:false,uid:result.user.uid};
this.updateUserData(newUser);
    new Toast(`Register Successfull...!!!`, {
      position: 'top'});
    this.router.navigate(['login']);
  },
  err=>{
    new Toast(`Error`, {
      position: 'top'});

    this.router.navigate(['register']);
  })
 };
 private updateUserData(user:blogUser){
  const userRef:AngularFirestoreDocument<any> = this.firestore.doc('users/'+user.uid);

  return userRef.set(user,{merge:true})
 };

 //gets user from firebase for each id

getUser(uId){
  return this.userCollection.doc(uId).get();
 };

 //User Login
 login (email:string,password:string){
  this.auth.signInWithEmailAndPassword(email,password).then(async (res)=>
  {
    new Toast(`Login Successfull...!!!`, {
      position: 'top'});

    localStorage.setItem('token','true');

//checks the user admin or not
    firstValueFrom( this.getUser(res.user.uid)).then((res)=>{

      var userInfo=res.data();

      if(userInfo['isAdmin']){

        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['createPost']);
      }
    })   });
};

//login using Gmail =>connects gmail with FSDB
googleSignIn(){
  return this.auth.signInWithPopup(new GoogleAuthProvider).then(res=>
  {
    //Updates User Info with email
    var updateUser:blogUser={  email:res.user.email,isAdmin:false,uid:res.user.uid};
    this.updateUserData(updateUser);

    localStorage.setItem('token','true');


    new Toast(`Login Successfull with Gmail`, {
      position: 'top'});
    this.router.navigate(['createPost']);
    //localStorage.setItem('token',JSON.stringify(res.user?.uid))
  }),
  err=>{
    new Toast('Error with Google Login',{
      position:'top'
    });

  }
 };

 //logout clears the users details from the localstorage
 logout(){
  this.auth.signOut().then(()=>{
    localStorage.removeItem('token');
    new Toast(`Logout successful...`, {
      position: 'top'});

    this.router.navigate([''])
  },
  err=>{
    new Toast(`Cannot Logout`, {
      position: 'top'});
  })
 };

 //login user authentication
 isAuthenticated():boolean{

  if (localStorage.getItem('token')!==null) {
      return true;
  }
  return false;
}


canAccess(){
  if (!this.isAuthenticated()) {
      //redirect to login
      this.router.navigate(['/login']);

  }
}
canAuthenticate(){
  if (this.isAuthenticated()) {
    //redirect to dashboard
    this.router.navigate(['/']);
  }
}
  //get all users from db for admin
  getUsers(){
    return this.userCollection.valueChanges({idField:'id'});
   };



}
