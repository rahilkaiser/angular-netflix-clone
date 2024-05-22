import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {from, Observable, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private firestore: AngularFirestore) {
  }

  /** Registers User with Email and Password
   *
   * @param email
   * @param username
   * @param password
   */
  register(email: string, username: string, password: string): Observable<void> {
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      if(user) {
        return updateProfile(user, { displayName: username }).then(
          () => {
            return this.firestore.collection('users').doc(user.uid).set({
              username: username,
              email: email
            });
          }
        );
      }
      return;
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, password).then(userCredential => {
    });
    return from(promise);
  }
  //
  // /** Stores Userinformation locally
  //  *
  //  * @param email
  //  * @param username
  //  * @private
  //  */
  // private storeUserLocally(email: string, username: string): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     try {
  //       localStorage.setItem('user', JSON.stringify({ email, username }));
  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }
  //
  // /** Get Userinfo from localStorage
  //  *
  //  */
  // getUser() {
  //   return JSON.parse(localStorage.getItem('user') || '{}');
  // }

  /** Signs the User out
   *
   */
  signOut(): Promise<void> {
    localStorage.removeItem('user');
    return this.firebaseAuth.signOut();
  }
}
