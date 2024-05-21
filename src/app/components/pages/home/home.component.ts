import {Router} from "@angular/router";

declare var google: any;
import {Component, OnInit} from '@angular/core';
import {window} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userName: string | null = null;
  profileImage: string | null = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('access_token');
    this.router.navigateByUrl('/' ).then( () => {
      document.location.reload();
    });
  }



  private loadUserData(): void {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const payload = JSON.parse(token);
      this.userName = payload.name;
      this.profileImage = payload.picture;

      console.log(this.profileImage);
      console.log(this.userName);
    }
  }


}
