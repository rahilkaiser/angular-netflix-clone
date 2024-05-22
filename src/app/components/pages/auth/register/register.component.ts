import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService,private router: Router) {
  }

  userName: string = '';
  mail: string = '';
  pass: string = '';
  registerWithForm() {
    console.log(this.userName, this.mail, this.pass);
    this.authService.register(this.mail, this.userName, this.pass).subscribe(
      (res) => {
        this.router.navigate(['home']);
      }
    );
  }

}
