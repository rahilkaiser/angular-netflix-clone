import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../../../models/movie.model";
import {forkJoin, map, Observable, Subscription} from "rxjs";
import {VideoService} from "../../../services/video.service";
import {BannerComponent} from "../home/components/banner/banner.component";
import {MovieSliderComponent} from "../home/components/movie-slider/movie-slider.component";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    BannerComponent,
    MovieSliderComponent
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit, OnDestroy{

  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  bannerMovie: Movie | null = null;
  bannerVideoKey: string = '';

  private videoSubsription: Subscription | undefined;
  bannerVideoSub: Subscription | undefined;
  bannerDetailsSub: Subscription | undefined;

  sources : Observable<any>[] = [
    this.videoService.getTopRated(),
    this.videoService.getUpcomingMovies(),
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
      map(([topRated, upcoming]) => {
        this.bannerDetailsSub = this.videoService.getBannerDetail(upcoming.results[0].id).subscribe(
          (res: any) => {
            this.bannerMovie = res;
          }
        );

        this.bannerVideoSub = this.videoService.getBannerVideo(upcoming.results[0].id).subscribe(
          (res: any) => {
            this.bannerVideoKey = res.results[0].key;
          }
        );

        return {upcoming, topRated};
      })
    ).subscribe((res: any) => {
      this.topRatedMovies = res.topRated.results as Movie[];
      this.upcomingMovies = res.upcoming.results as Movie[];
    });
  }
}
