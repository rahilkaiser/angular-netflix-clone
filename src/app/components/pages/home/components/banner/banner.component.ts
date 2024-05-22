import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgIf} from "@angular/common";

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
    NgIf
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})


export class BannerComponent implements OnChanges {

  @Input({required: true}) title = '';
  @Input() description = '';
  @Input({required: true}) videoKey = '';

  public videoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoKey'] && changes['videoKey'].currentValue) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${changes['videoKey'].currentValue}?autoplay=1&mute=1&loop=1&controls=0&autohide=1&showinfo=0&modestbranding=1&playsinline=1&enablejsapi=1&start=50`
      );
    }
  }
}
