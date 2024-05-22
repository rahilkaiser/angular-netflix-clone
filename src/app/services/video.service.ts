import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

   private url = 'https://api.themoviedb.org/3/movie/changes?page=1';
   private options = {
    params: {
      include_adults: 'false',
      include_video: 'true',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWM2MjU3NTRkNjA2YTI2NjYzZTU3MzVmZTNlOTIwZSIsInN1YiI6IjY2NGJjMzljM2Y0NGRjNWUzNzc5NGUxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YG0HGENZ7WvvMfkpYERuLUYOhVvjIy7-4YLnjLgq9Uk'
    }
  };

  constructor(private httpClient: HttpClient) { }


  getMovies() {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/discover/movie', this.options);
  }

  getTvShows() {
    return this.httpClient.get('https://api.themoviedb.org/3/discover/tv', this.options)
  }

  // getRatedMovies() {
  //   return this.httpClient.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', this.options)
  // }

  getBannerImage(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/images`, this.options)
  }

  getBannerVideo(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/videos`, this.options);
  }

  getBannerDetail(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}`, this.options);
  }

  getNowPlayingMovies() {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/now_playing', this.options)
  }

  getPopularMovies() {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/popular', this.options)
  }

  getTopRated() {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/top_rated', this.options)
  }

  getUpcomingMovies() {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/upcoming', this.options)
  }
}

