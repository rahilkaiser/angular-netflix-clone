import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  mail: string = '';
  pass: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }



  signInAnonymously() {
    this.authService.signInAnonymously().subscribe({
      next: result => {
        this.router.navigate(['home']);
      }
    })
  }

  loginEmailPassword() {
    this.authService.login(this.mail, this.pass).subscribe({
      next: result => {
        this.router.navigate(['home']);
      }
    });
  }
}
