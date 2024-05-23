import {AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgIf} from "@angular/common";
import {Movie} from "../../../../../models/movie.model";
import {MovieDetailsModalComponent} from "../movie-details-modal/movie-details-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DescriptionPipe} from "../../../../../pipes/description.pipe";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgIf,
    DescriptionPipe
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})


export class BannerComponent implements OnChanges {

  @Input({required: true}) videoKey = '';
  @Input({required: true}) movie: Movie | null = null;

  public videoUrl: SafeResourceUrl | undefined;
  private modalService = inject(NgbModal);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoKey'] && changes['videoKey'].currentValue) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${changes['videoKey'].currentValue}?autoplay=1&mute=1&loop=1&controls=0&autohide=1&showinfo=0&modestbranding=1&playsinline=1&enablejsapi=1&start=50&loop=1&playlist=${changes['videoKey'].currentValue}`
      );
    }
  }

  openModal(movie: Movie | null) {
    if (this.movie) {
      const modalRef = this.modalService.open(MovieDetailsModalComponent, {
        windowClass: 'modal-holder',
        animation: true
      });
      modalRef.componentInstance.movie = movie;
    }
  }
}
