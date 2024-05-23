import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../../../models/movie.model";
import {forkJoin, map, Subscription} from "rxjs";
import {VideoService} from "../../../services/video.service";
import {BannerComponent} from "../home/components/banner/banner.component";
import {MovieSliderComponent} from "../home/components/movie-slider/movie-slider.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    BannerComponent,
    MovieSliderComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {

  trendingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  actionMovies: Movie[] = [];
  animationMovies: Movie[] = [];
  comedyMovies: Movie[] = [];

  bannerMovie: Movie | null = null;
  bannerVideoKey: string = '';

  private videoSubsription: Subscription | undefined;
  bannerVideoSub: Subscription | undefined;
  bannerDetailsSub: Subscription | undefined;

  sources = [
    this.videoService.getTrendingMovies(),
    this.videoService.getTopRated(),
    this.videoService.getMoviesShowsByGenre(28),
    this.videoService.getMoviesShowsByGenre(16),
    this.videoService.getMoviesShowsByGenre(35),
  ];

  constructor(private videoService: VideoService) {
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

  ngOnInit(): void {
    this.videoSubsription = forkJoin(this.sources).pipe(
      map(([trending, topRated, action, animation, comedy]) => {
        this.bannerDetailsSub = this.videoService.getBannerDetail(comedy.results[1].id).subscribe(
          (res: any) => {
            this.bannerMovie = res;
          }
        );

        this.bannerVideoSub = this.videoService.getBannerVideo(comedy.results[1].id).subscribe(
          (res: any) => {
            this.bannerVideoKey = res.results[0].key;
          }
        );

        return {trending, topRated, action, animation, comedy};
      })
    ).subscribe((res: any) => {
      this.trendingMovies = res.trending.results as Movie[];
      this.topRatedMovies = res.topRated.results as Movie[];
      this.actionMovies = res.action.results as Movie[];
      this.animationMovies = res.animation.results as Movie[];
      this.comedyMovies = res.comedy.results as Movie[];
    });
  }

}
