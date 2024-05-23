import {Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {BannerComponent} from "./components/banner/banner.component";
import {VideoService} from "../../../services/video.service";
import {MovieSliderComponent} from "./components/movie-slider/movie-slider.component";
import {Movie} from "../../../models/movie.model";
import {forkJoin, map, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {DescriptionPipe} from "../../../pipes/description.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MovieSliderComponent,
    AsyncPipe,
    DescriptionPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  tvShows: Movie[] = [];
  ratedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  bannerMovie: Movie | null = null;
  bannerVideoKey: string = '';

  private videoSubsription: Subscription | undefined;
  bannerVideoSub: Subscription | undefined;
  bannerDetailsSub: Subscription | undefined;

  sources = [
    this.videoService.getMovies(),
    this.videoService.getTvShows(),
    this.videoService.getNowPlayingMovies(),
    this.videoService.getUpcomingMovies(),
    this.videoService.getPopularMovies(),
    this.videoService.getTopRated()
  ];

  constructor(private router: Router, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoSubsription = forkJoin(this.sources).pipe(
      map(([movies, tvShows, nowPlaying, upcoming, popular, topRated]) => {
        this.bannerDetailsSub = this.videoService.getBannerDetail(movies.results[0].id).subscribe(
          (res: any) => {
            this.bannerMovie = res;
          }
        );

        this.bannerVideoSub = this.videoService.getBannerVideo(movies.results[0].id).subscribe(
          (res: any) => {
            this.bannerVideoKey = res.results[0].key;
          }
        );

        return {movies, tvShows, nowPlaying, upcoming, popular, topRated};
      })
    ).subscribe((res: any) => {
      this.movies = res.movies.results as Movie[];
      this.tvShows = res.tvShows.results as Movie[];
      this.nowPlayingMovies = res.nowPlaying.results as Movie[];
      this.upcomingMovies = res.upcoming.results as Movie[];
      this.popularMovies = res.popular.results as Movie[];
      this.topRatedMovies = res.topRated.results as Movie[];
    });
  }

  ngOnDestroy(): void {
    if (this.videoSubsription) {
      this.videoSubsription.unsubscribe();
    }
    if (this.bannerVideoSub) {
      this.bannerVideoSub.unsubscribe();
    }
    if (this.bannerDetailsSub) {
      this.bannerDetailsSub.unsubscribe();
    }
  }
}



