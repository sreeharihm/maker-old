import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase,AngularFireList  } from '@angular/fire/database'
import { Router } from "@angular/router";
import { User } from "../../shared/services/user";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  todos$: AngularFireList<any[]>;
  constructor(public afAuth: AngularFireAuth,public router: Router,public afs: AngularFirestore,private db: AngularFireDatabase){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
    })  
  }
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        if(this.userData){
         localStorage.setItem('user', JSON.stringify(this.userData));
         this.router.navigateByUrl('/home');
        }
      }).catch((error) => {
        window.alert(error.message)
     })
 }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user===null){
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          return (user) ? true : false;
        }
      })
    }
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }  
  UpdateUserData(displayName,photoUrl,phoneNo){ 
    const user = JSON.parse(localStorage.getItem('user'));  
    const tutRef= this.db.object('/users/'+user.uid).update({displayName:displayName, imageData: photoUrl,phoneNo:phoneNo }); 
    this.router.navigateByUrl('/home');
  }
  getUsers(){
    return new Promise<any>((resolve, reject) => { 
      this.afAuth.authState.subscribe(user => {
        if (user) { 
        this.db.object('/users/'+user.uid).snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
      }})
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
  }
}
