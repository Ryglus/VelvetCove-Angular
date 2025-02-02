import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

import { RouterModule } from '@angular/router';
import {Product} from "../../../services/dto/product.dto";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() size: 'sm' | 'md' | 'lg' | number = 'md';

  cartService = inject(CartService);

  getHeight(): string {
    if (typeof this.size === 'number') return `${this.size}px`;
    return this.size === 'sm' ? '100px' : this.size === 'lg' ? '620px' : '200px';
  }

  addToCart() {
    this.cartService.addItem(this.product, 1);
  }

  get itemQuantity(): number {
    return this.cartService.getItemQuantity(this.product.id);
  }
}
