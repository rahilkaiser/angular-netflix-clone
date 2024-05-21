declare var google: any;

import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
export class HeaderComponent {

  @Input() profileImg: string |null = null;
  @Input() userName: string | null = null;

  isMenuOpen = false;

  constructor(private router: Router) {

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected readonly document = document;

  navigateToHome() {
    this.router.navigate(['home']);
  }

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('access_token');
    // this.router.navigateByUrl('/' ).then( () => {
    //   document.location.reload();
    // });
  }
}
