import { Injectable, signal, computed } from '@angular/core';
import {Product} from "./dto/product.dto";


@Injectable({
  providedIn: 'root',
})
export class CartService {
  // ✅ Store cart as an array of { product, quantity }
  private cartItems = signal<{ product: Product; quantity: number }[]>([]);

  // ✅ Computed value for total items in cart
  totalItems = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  // ✅ Computed value for total price
  totalPrice = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  // ✅ Add an item to the cart
  addItem(product: Product, quantity: number = 1) {
    const currentCart = [...this.cartItems()];
    const existingItem = currentCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cartItems.set(currentCart); // ✅ Update the state
  }

  // ✅ Remove an item from the cart
  removeItem(productId: number) {
    const updatedCart = this.cartItems().filter((item) => item.product.id !== productId);
    this.cartItems.set(updatedCart);
  }

  // ✅ Get quantity of a specific product in the cart
  getItemQuantity(productId: number): number {
    return this.cartItems().find((item) => item.product.id === productId)?.quantity || 0;
  }

  // ✅ Update quantity of a product in the cart
  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const updatedCart = this.cartItems().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    this.cartItems.set(updatedCart);
  }

  // ✅ Clear entire cart
  clearCart() {
    this.cartItems.set([]);
  }
}
