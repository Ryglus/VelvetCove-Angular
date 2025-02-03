import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Product } from "./dto/product.dto";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  private snackbarService = inject(SnackbarService);
  cartItems = signal<{ product: Product; quantity: number }[]>([]);

  totalItems = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  getItems() {
    return this.cartItems();
  }

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const storedCart = localStorage.getItem(this.storageKey);
      this.cartItems.set(storedCart ? JSON.parse(storedCart) : []);
    }

    effect(() => {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems()));
      }
    });
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  addItem(product: Product, quantity: number = 1) {
    const currentCart = [...this.cartItems()];
    const existingItem = currentCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }
    this.snackbarService.showMessage(`Updated quantity for ${product.title}`);
    this.cartItems.set(currentCart);
  }

  removeItem(productId: number) {
    const updatedCart = this.cartItems().filter((item) => item.product.id !== productId);
    this.cartItems.set(updatedCart);
    this.snackbarService.showMessage(`Updated quantity for ${productId}`);
  }

  getItemQuantity(productId: number): number {
    return this.cartItems().find((item) => item.product.id === productId)?.quantity || 0;
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const updatedCart = this.cartItems().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.snackbarService.showMessage(`Updated quantity for ${productId}`);
    this.cartItems.set(updatedCart);
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
