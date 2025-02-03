import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppLayoutComponent } from "../../layouts/app-layout/app-layout.component";
import { SvgPageBgComponent } from "../../components/common/svg-page-bg/svg-page-bg.component";

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AppLayoutComponent, SvgPageBgComponent],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this.cartService.getItems;
  totalPrice = this.cartService.totalPrice;

  checkoutForm = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: '',
  };

  countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France'];

  handleCheckout() {
    if (!this.checkoutForm.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Simulate order placement
    console.log('Order placed:', this.checkoutForm);
    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation']);
  }

  trackById(index: number, item: any) {
    return item.product.id;
  }
}
