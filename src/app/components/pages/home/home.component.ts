import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {BannerComponent} from "./components/banner/banner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent
  ],
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
