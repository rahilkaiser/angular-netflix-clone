import {Routes} from '@angular/router';
import {AuthComponent} from "./components/pages/auth/auth.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/pages/auth/register/register.component";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'register', component: RegisterComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: ''}
];
