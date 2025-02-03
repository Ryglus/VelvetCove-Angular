import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SvgPageBgComponent } from '../../components/common/svg-page-bg/svg-page-bg.component';


import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ProductRecommendedSectionComponent
} from "../../components/product-recommended-section/product-recommended-section.component";
import { AppLayoutComponent } from "../../layouts/app-layout/app-layout.component";
import {
  ProductDetailCarouselComponent
} from "./_components/product-detail-carousel/product-detail-carousel.component";
import { map } from "rxjs";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgPageBgComponent, ProductRecommendedSectionComponent, RouterLink, AppLayoutComponent, ProductDetailCarouselComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  productId = toSignal(this.route.params.pipe(map(params => params['id'])), { initialValue: '' });

  product = toSignal(this.productService.fetchProductById(this.productId()), { initialValue: null });

  quantity = signal(1);
  itemQuantity = computed(() => this.cartService.getItemQuantity(this.product()?.id ?? 0));

  breadcrumbs = computed(() => {
    const product = this.product();
    return product
      ? [
        { label: product.category, path: `/products/${product.category}` },
        { label: product.title, path: `/products/${product.category}/${product.id}` }
      ]
      : [];
  });

  handleAddToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addItem(currentProduct, this.quantity());
    }
  }

  handleRemoveFromCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.removeItem(currentProduct.id);
    }
  }
}
