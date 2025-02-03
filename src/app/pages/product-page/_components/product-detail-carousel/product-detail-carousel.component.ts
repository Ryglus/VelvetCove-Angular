import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-carousel.component.html',
  styleUrls: ['./product-detail-carousel.component.css']
})
export class ProductDetailCarouselComponent {
  @Input() images: string[] = [];

}
