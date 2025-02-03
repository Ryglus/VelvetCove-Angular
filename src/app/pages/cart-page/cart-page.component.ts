import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SvgPageBgComponent } from '../../components/common/svg-page-bg/svg-page-bg.component';
import { ProductRecommendedSectionComponent } from '../../components/product-recommended-section/product-recommended-section.component';

import { FormsModule } from '@angular/forms';
import { ProductIncartCardComponent } from "../../components/cards/product-incart-card/product-incart-card.component";
import { AppLayoutComponent } from "../../layouts/app-layout/app-layout.component";


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SvgPageBgComponent,
    ProductRecommendedSectionComponent,
    ProductIncartCardComponent,
    FormsModule,
    AppLayoutComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  private cartService = inject(CartService);

  items = computed(() => this.cartService.getItems());
  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  promoCode = signal('');

  clearCart() {
    this.cartService.clearCart();
  }

  handleApplyPromo() {
    console.log('Promo Code Applied:', this.promoCode());
  }

  trackByProductId(index: number, item: { product: any; quantity: number }) {
    return item.product.id;
  }
}
