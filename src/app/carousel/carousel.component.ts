import { Component, Input, OnInit } from '@angular/core';

/*interface CarouselImage {
  src: string;
  alt: string;
}*/

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  ngOnInit(): void {
  }

  selectedIndex = 0;
  //@Input() images: CarouselImage[] = [];
  @Input() images: string[] = [];

  /*mijenja sliku kad se klikne na tackicu */
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
