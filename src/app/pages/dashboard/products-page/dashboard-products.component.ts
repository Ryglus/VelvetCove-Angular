import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from "../../../services/product.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  products = signal<any[]>([]);

  nameFilter = signal('');
  minPriceFilter = signal<number | null>(null);
  maxPriceFilter = signal<number | null>(null);
  categoryFilter = signal('');

  filteredProducts = computed(() => {
    const products = this.products();
    const name = this.nameFilter().toLowerCase();
    const minPrice = this.minPriceFilter() ?? 0;
    const maxPrice = this.maxPriceFilter() ?? Number.MAX_VALUE;
    const category = this.categoryFilter().toLowerCase();

    return products.filter(product =>
      product.title.toLowerCase().includes(name) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.category.toLowerCase().includes(category)
    );
  });

  pageSize = signal(10);
  pageIndex = signal(0);

  displayedColumns: string[] = ['image', 'id', 'title', 'price', 'description', 'category', 'rating', 'actions'];

  constructor() {
    this.fetchProducts();

    effect(() => {
      this.filteredProducts();
    });
  }

  fetchProducts() {
    this.productService.fetchProducts().subscribe((data) => {
      this.products.set(data);
    });
  }

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  deleteProduct(productId: number) {
    this.products.set(this.products().filter(p => p.id !== productId));
  }
}
