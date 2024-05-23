import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'https://api.themoviedb.org/3';
  // private options = {
  //   params: {
  //     include_adults: 'false',
  //     include_video: 'true',
  //     language: 'en-US',
  //     page: '1',
  //     sort_by: 'popularity.desc',
  //   },
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWM2MjU3NTRkNjA2YTI2NjYzZTU3MzVmZTNlOTIwZSIsInN1YiI6IjY2NGJjMzljM2Y0NGRjNWUzNzc5NGUxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YG0HGENZ7WvvMfkpYERuLUYOhVvjIy7-4YLnjLgq9Uk'
  //   }
  // };

  private options = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWM2MjU3NTRkNjA2YTI2NjYzZTU3MzVmZTNlOTIwZSIsInN1YiI6IjY2NGJjMzljM2Y0NGRjNWUzNzc5NGUxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YG0HGENZ7WvvMfkpYERuLUYOhVvjIy7-4YLnjLgq9Uk',
      'Accept': 'application/json'
    }),
    params: new HttpParams()
      .set('language', 'en-US')
      .set('include_adult', 'false')
      .set('include_video', 'true')
      .set('page', '1')
      .set('sort_by', 'popularity.desc')
  };



  constructor(private httpClient: HttpClient) {
  }


  getMovies() {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/discover/movie', this.options);
  }

  getTvShows() {
    return this.httpClient.get('https://api.themoviedb.org/3/discover/tv', this.options)
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

//   TV
  getPopularTvShows(): Observable<any> {
    return this.httpClient.get('https://api.themoviedb.org/3/tv/popular', this.options)
  }

  getTopRatedTvShows(): Observable<any> {
    return this.httpClient.get('https://api.themoviedb.org/3/tv/top_rated', this.options);

  }

  getTrendingTvShows(): Observable<any> {

    return this.httpClient.get('https://api.themoviedb.org/3/trending/tv/week', this.options)

  }


  getTvShowsByGenre(genreId: number): Observable<any> {
    const genreParams = this.options.params.set('with_genres', genreId.toString());

    return this.httpClient.get(`https://api.themoviedb.org/3/discover/tv`, { ...this.options, params: genreParams })
  }

  // Movies
  getTrendingMovies(): Observable<any> {
    return this.httpClient.get(`https://api.themoviedb.org/3/trending/movie/week`, this.options)

  }

  getMoviesShowsByGenre(genreId: number): Observable<any> {
    const genreParams = this.options.params.set('with_genres', genreId.toString());

    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie`, { ...this.options, params: genreParams })
  }
}

