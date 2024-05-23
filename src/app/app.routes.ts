import {Routes} from '@angular/router';
import {AuthComponent} from "./components/pages/auth/auth.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/pages/auth/register/register.component";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {TvshowsComponent} from "./components/pages/tvshows/tvshows.component";
import {MoviesComponent} from "./components/pages/movies/movies.component";
import {NewComponent} from "./components/pages/new/new.component";
import {MylistComponent} from "./components/pages/mylist/mylist.component";

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
  {
    path: 'tv',
    component: TvshowsComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'mylist',
    component: MylistComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'register', component: RegisterComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: ''}
];
