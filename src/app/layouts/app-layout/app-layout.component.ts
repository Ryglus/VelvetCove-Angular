import { Component, Input, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent {
  private cartService = inject(CartService);

  token: any;
  drawerOpened: any;
  isScrolled = false;

  @Input() takeSpace = true;

  uniqueItemsCount = computed(() => this.cartService.totalItems());

  toggleDrawer() {}

  handleLogout() {}
}
