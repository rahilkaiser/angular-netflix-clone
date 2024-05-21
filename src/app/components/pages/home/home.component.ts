import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {BannerComponent} from "./components/banner/banner.component";
import {VideoService} from "../../../services/video.service";
import {MovieSliderComponent} from "./components/movie-slider/movie-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MovieSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userName: string | null = null;
  profileImage: string | null = null;

  constructor(private router: Router, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.loadUserData();

    this.videoService.getMovies().subscribe((response) => {
      console.log("BHBJHBJBJ", response);
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
// test = {
//     page: 1,
//   results: [
//     {
//       adult: false,
//       backdrop_path: "",
//       genre_ids: [1,2,3],
//       id: 82934,
//       original_language: "en",
//       original_title: "Godzilla x Kong",
//       overview: "Following their explosive Desscription",
//       popularity: 736.08,
//       poster_path: "",
//       release_date: "2024-03-27",
//       title: "Godzilla x Kong",
//       video: false,
//       vote_average: 7.25,
//       vote_count: 1882
//     }
//   ],
//   total_pages: 46622,
//   total_results: 932435
// }

}



