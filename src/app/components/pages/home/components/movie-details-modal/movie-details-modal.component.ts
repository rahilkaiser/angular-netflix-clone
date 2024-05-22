import {Component, inject, Input} from '@angular/core';
import {Movie} from "../../../../../models/movie.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImagePipe} from "../../../../../pipes/image.pipe";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-movie-details-modal',
  standalone: true,
  imports: [
    ImagePipe,
    DatePipe
  ],
  templateUrl: './movie-details-modal.component.html',
  styleUrl: './movie-details-modal.component.css'
})
export class MovieDetailsModalComponent {
  @Input({required: true}) movie: Movie | null = null;
  @Input() name: string = '';

  activeModal = inject(NgbActiveModal);




}
