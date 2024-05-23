import {AuthService} from "../../../../../services/auth.service";

declare var google: any;

import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../../../../models/user.model";
import {document} from "postcss";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userData: User | null = null;

  isMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {

    this.authService.getUserData().subscribe(data => {
      this.userData = data;
    });

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected readonly document = document;

  navigateToHome() {
    this.router.navigate(['home']);
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['auth']);
    })
  }


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
