import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../../services/dto/product.dto";
import { CartService } from "../../../services/cart.service";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";


@Component({
  selector: 'app-product-incart-card',
  templateUrl: './product-incart-card.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./product-incart-card.component.css']
})
export class ProductIncartCardComponent {
  @Input() product!: Product;
  @Input() quantity: number = 1;
  @Input() isEditable: boolean = true;
  @Output() quantityChange = new EventEmitter<number>();

  constructor(private cartService: CartService) {}

  get totalPrice(): string {
    return (this.product.price * this.quantity).toFixed(2);
  }

  handleQuantityChange(newQuantity: number) {
    this.quantityChange.emit(newQuantity);
    this.cartService.updateQuantity(this.product.id, newQuantity);
  }

  removeItem() {
    this.cartService.removeItem(this.product.id);
  }
}
