import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import {ProductService} from "../../services/product.service";
import {ProductCardComponent} from "../cards/product-card/product-card.component";

@Component({
  selector: 'app-product-recommended-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-recommended-section.component.html',
  styleUrls: ['./product-recommended-section.component.css'],
})
export class ProductRecommendedSectionComponent {
  @Input() title?: string;
  @Input() category!: string;
  @Input() currentProductId?: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  products$: Observable<any[]> | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.fetchProductsByCategory(this.category);
  }
}
