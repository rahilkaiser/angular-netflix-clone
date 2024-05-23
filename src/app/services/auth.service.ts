import {Injectable} from '@angular/core';
import {updateProfile} from "@angular/fire/auth";
import {from, Observable, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {GoogleAuthProvider} from "@firebase/auth";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private firestore: AngularFirestore, private router: Router) {
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
      if (user) {
        return updateProfile(user, {displayName: username}).then(
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

  /** Signs the User out
   *
   */
  signOut(): Promise<void> {
    localStorage.removeItem('user');
    return this.firebaseAuth.signOut();
  }

  signInAnonymously() {
    const promise = this.firebaseAuth.signInAnonymously().then(
      () => {
      }
    );
    return from(promise);
  }

  signInWithGoogle(): Observable<void> {
    let promise = this.firebaseAuth.signInWithPopup(new GoogleAuthProvider()).then(userCredential => {
      const user = userCredential.user;
      if (user) {
        return updateProfile(user, {displayName: user.displayName}).then(
          () => {
            return this.firestore.collection('users').doc(user.uid).set({
              username: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            });
          }
        );
      }
      return;
    });
    return from(promise);
  }

  getUserData(): Observable<any> {
    return this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return new Observable<User | null>(observer => observer.next(null));        }
      })
    );
  }


}
