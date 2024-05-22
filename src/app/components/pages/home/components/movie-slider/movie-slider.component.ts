import {Component, inject, Input, ViewChild} from '@angular/core';
import {SlickCarouselComponent, SlickCarouselModule} from "ngx-slick-carousel";
import {NgForOf} from "@angular/common";
import {Movie} from "../../../../../models/movie.model";
import {DescriptionPipe} from "../../../../../pipes/description.pipe";
import {ImagePipe} from "../../../../../pipes/image.pipe";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MovieDetailsModalComponent} from "../movie-details-modal/movie-details-modal.component";

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [
    SlickCarouselModule,
    NgForOf,
    DescriptionPipe,
    ImagePipe
  ],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css'
})
export class MovieSliderComponent {

  @ViewChild('slickModal') slickModal: SlickCarouselComponent | undefined;
  @Input() videos: Movie[] = [];
  @Input() title: string = '';

  private modalService = inject(NgbModal);

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    loop: true,
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

  openModal(movie: Movie) {
    const modalRef = this.modalService.open(MovieDetailsModalComponent, {windowClass: 'modal-holder',animation: true});
    modalRef.componentInstance.movie = movie;
  }

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
