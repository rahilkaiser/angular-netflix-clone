import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    (window as any).onSignIn = this.onSignIn.bind(this);
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  onSignIn(googleUser: any): void {
    console.log('Google User: ', googleUser);

    if (googleUser) {
      //decode the token
      const payload = this.decodeToken(googleUser.credential);
      //store the token in session
      sessionStorage.setItem('access_token', JSON.stringify(payload));
      //navigate to home

      this.router.navigate(['home']).then(() => {
        document.location.reload();
      })
    }
  }

  signInAnonymously() {
    this.router.navigate(['home']).then(() => {
      document.location.reload();
    })
  }
}
