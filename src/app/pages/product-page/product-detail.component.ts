import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SvgPageBgComponent } from '../../components/common/svg-page-bg/svg-page-bg.component';
import { ProductDetailCarouselComponent } from './product-detail-carousel/product-detail-carousel.component';
import { ProductDetailRecommendedComponent } from '../../components/product-recommended/product-detail-recommended.component';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgPageBgComponent, ProductDetailCarouselComponent, ProductDetailRecommendedComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // ✅ Extract product ID from route
  productId = signal<string | null>(null);

  // ✅ Fetch product details
  product = toSignal(this.productService.fetchProductById(this.productId()), { initialValue: null });

  // ✅ Cart state management
  quantity = signal(1);
  itemQuantity = computed(() => this.cartService.getItemQuantity(this.product()?.id));

  // ✅ Breadcrumbs
  breadcrumbs = computed(() => {
    const product = this.product();
    return product ? [
      { label: product.category.toUpperCase(), path: `/products/${product.category}` },
      { label: product.title.toUpperCase(), path: `/products/${product.category}/${product.id}` }
    ] : [];
  });

  ngOnInit() {
    effect(() => {
      this.route.params.subscribe(params => {
        this.productId.set(params['id']);
      });
    });
  }

  // ✅ Handle adding to cart
  handleAddToCart() {
    if (this.product()) {
      this.cartService.addItem(this.product(), this.quantity());
    }
  }

  // ✅ Handle removing from cart
  handleRemoveFromCart() {
    if (this.product()) {
      this.cartService.removeItem(this.product().id);
    }
  }
}
