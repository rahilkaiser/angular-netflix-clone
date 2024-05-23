import {Component, OnDestroy, OnInit} from '@angular/core';
import {BannerComponent} from "../home/components/banner/banner.component";
import {HeaderComponent} from "../home/components/header/header.component";
import {MovieSliderComponent} from "../home/components/movie-slider/movie-slider.component";
import {Movie} from "../../../models/movie.model";
import {forkJoin, map, Subscription} from "rxjs";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [
    BannerComponent,
    HeaderComponent,
    MovieSliderComponent
  ],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TvshowsComponent implements OnInit, OnDestroy {

  trendingTvShows: Movie[] = [];
  topRatedTvShows: Movie[] = [];
  actionTVShows: Movie[] = [];
  animationTVShows: Movie[] = [];
  comedyTVShows: Movie[] = [];

  bannerMovie: Movie | null = null;
  bannerVideoKey: string = '';

  private videoSubsription: Subscription | undefined;
  bannerVideoSub: Subscription | undefined;
  bannerDetailsSub: Subscription | undefined;

  sources = [
    this.videoService.getTrendingTvShows(),
    this.videoService.getTopRatedTvShows(),
    this.videoService.getTvShowsByGenre(10759),
    this.videoService.getTvShowsByGenre(16),
    this.videoService.getTvShowsByGenre(35),
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
        this.bannerDetailsSub = this.videoService.getBannerDetail(animation.results[4].id).subscribe(
          (res: any) => {
            this.bannerMovie = res;
          }
        );

        this.bannerVideoSub = this.videoService.getBannerVideo(animation.results[10].id).subscribe(
          (res: any) => {
            this.bannerVideoKey = res.results[0].key;
          }
        );

        return {trending, topRated, action, animation, comedy};
      })
    ).subscribe((res: any) => {
      this.trendingTvShows = res.trending.results as Movie[];
      this.topRatedTvShows = res.topRated.results as Movie[];
      this.actionTVShows = res.action.results as Movie[];
      this.animationTVShows = res.animation.results as Movie[];
      this.comedyTVShows = res.comedy.results as Movie[];
    });
  }
}
