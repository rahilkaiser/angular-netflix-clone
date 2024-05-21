import {Component, ViewChild} from '@angular/core';
import {SlickCarouselComponent, SlickCarouselModule} from "ngx-slick-carousel";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [
    SlickCarouselModule,
    NgForOf
  ],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css'
})
export class MovieSliderComponent {

  @ViewChild('slickModal') slickModal: SlickCarouselComponent | undefined;

  slides = [
    { img: 'https://image.tmdb.org/t/p/w500/ba7hnMx1HAze0QSJSNfsTBycS8U.jpg', title: 'Movie 1' },
    { img: 'https://image.tmdb.org/t/p/w500/c3XBgBLzB9Sh7k7ewXY2QpfH47L.jpg', title: 'Movie 2' },
    { img: 'https://image.tmdb.org/t/p/w500/b5rOkbQ0jKYvBqBf3bwJ6nXBOtx.jpg', title: 'Movie 3' },
    { img: 'https://image.tmdb.org/t/p/w500/aNsrgElf0fiKBSR8cWWEL6XUTte.jpg', title: 'Movie 4' },
    { img: 'https://image.tmdb.org/t/p/w500/dueiWzWc81UAgnbDAyH4Gjqnh4n.jpg', title: 'Movie 5' },
    { img: 'https://image.tmdb.org/t/p/w500/hwNRc9ZWrakGdql22srY7DqtmRQ.jpg', title: 'Movie 6' },
    { img: 'https://image.tmdb.org/t/p/w500/trAOGwksvgHYNpbK4GewbjYQ1pi.jpg', title: 'Movie 7' },
    { img: 'https://image.tmdb.org/t/p/w500/zAIippNnm6o0gYEtjapbjQSxP8G.jpg', title: 'Movie 8' },
    { img: 'https://image.tmdb.org/t/p/w500/tNyJxHK3m7NAAKNYITLJ5oxS0YR.jpg', title: 'Movie 9' },
    { img: 'https://image.tmdb.org/t/p/w500/hMh1mR2kNl8kHjpIuPh4TICTwjo.jpg', title: 'Movie 10' },
    { img: 'https://image.tmdb.org/t/p/w500/c4EkF5JAZ83bUqNErhuSd9xw6uJ.jpg', title: 'Movie 11' },
    { img: 'https://image.tmdb.org/t/p/w500/79DgItjsyH5tpA3mC2xv5gU2zlZ.jpg', title: 'Movie 12' },
  ];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    arrows: true,
    dots: false,
    prevArrow: '.slick-prev',
    nextArrow: '.slick-next',
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  skipSlides(direction: string) {
    const slidesToSkip = 4;

    if (this.slickModal) {
      if (direction === 'next') {
        this.slickModal.slickNext();
        for (let i = 1; i < slidesToSkip; i++) {
          this.slickModal.slickNext();
        }
      } else if (direction === 'prev') {
        this.slickModal.slickPrev();
        for (let i = 1; i < slidesToSkip; i++) {
          this.slickModal.slickPrev();
        }
    }

    }
  }
}
