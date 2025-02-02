import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-fs-carousel',
  standalone: true,
  templateUrl: './fs-carousel.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./fs-carousel.component.css']
})
export class FsCarouselComponent {
  slides = [
    { id: 0, src: 'assets/img/slide3.webp', title: 'Welcome to VelvetCove', subtitle: 'Explore our timeless fashion.', category: "women's clothing" },
    { id: 1, src: 'assets/img/slide2.webp', title: 'Men’s Collection', subtitle: 'Classic styles redefined.', category: "men's clothing" },
    { id: 2, src: 'assets/img/slide6.webp', title: 'Exclusive Accessories', subtitle: 'The final touch to your outfit.', category: "jewelery" }
  ];

  currentIndex = 0;

  constructor(private router: Router) {}

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToCategory(category: string) {
    this.router.navigate(['/products', category]);
  }
}
