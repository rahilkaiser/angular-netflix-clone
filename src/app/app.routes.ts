import { Routes } from '@angular/router';
import {AuthComponent} from "./components/pages/auth/auth.component";

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '', redirectTo: 'auth', pathMatch: 'full',
  }
];
