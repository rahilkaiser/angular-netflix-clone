import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/pages/home/components/header/header.component";
import {AuthService} from "./services/auth.service";
import {User} from "./models/user.model";
import {AuthComponent} from "./components/pages/auth/auth.component";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "./components/pages/auth/register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-netflix-clone';

  isShow = false;

  constructor(private router: Router) {
  }

  showHideNav($event: any) {
    this.isShow = !(($event instanceof AuthComponent) || $event instanceof RegisterComponent);
  }
}
