import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { SvgPageBgComponent } from '../../components/common/svg-page-bg/svg-page-bg.component';

import { ProductFilterComponent } from "./product-filter/product-filter.component";
import { toSignal } from '@angular/core/rxjs-interop';
import {PaginationComponent} from "../../components/common/pagination/pagination.component";
import {AppLayoutComponent} from "../../layouts/app-layout/app-layout.component"; // ✅ Convert Observable to Signal

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductFilterComponent, SvgPageBgComponent, PaginationComponent, AppLayoutComponent],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  products = toSignal(this.productService.fetchProducts(), { initialValue: [] });
  categories = toSignal(this.productService.fetchCategories(), { initialValue: [] });

  category = signal<string | null>(null);

  query = signal({
    name: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
    minRating: null as number | null,
    categoryFilter: null as string | null,
    page: 1,
    productsPerPage: 6,
  });

  filteredProducts = computed(() => {
    const allProducts = this.products();
    const queryValue = this.query();
    const { name, minPrice, maxPrice, minRating, categoryFilter } = queryValue;

    return allProducts.filter(product => {
      const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesMinPrice = minPrice !== null ? product.price >= minPrice : true;
      const matchesMaxPrice = maxPrice !== null ? product.price <= maxPrice : true;
      const matchesRating = minRating !== null ? product.rating.rate >= minRating : true;
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;

      return matchesName && matchesMinPrice && matchesMaxPrice && matchesRating && matchesCategory;
    });
  });

  paginatedProducts = computed(() => {
    const products = this.filteredProducts();
    const queryValue = this.query();
    const { page, productsPerPage } = queryValue;
    const startIndex = (page - 1) * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  });

  totalPages = computed(() => {
    const totalProducts = this.filteredProducts().length;
    return Math.ceil(totalProducts / this.query().productsPerPage);
  });

  ngOnInit() {
    effect(() => {
      this.route.params.subscribe(params => {
        this.category.set(params['category'] || null);
        this.query.update(q => ({ ...q, categoryFilter: params['category'] || null }));
      });
    });
  }

  handleCategoryChange(value: string | null) {
    if (value) {
      this.router.navigate(['/products', value]);
    } else {
      this.router.navigate(['/products']);
    }
    this.query.update(q => ({ ...q, categoryFilter: value }));
  }

  setQuery(update: Partial<{ name: string; minPrice: number | null; maxPrice: number | null; minRating: number | null; categoryFilter: string | null; page: number; productsPerPage: number }>) {
    this.query.update(q => ({ ...q, ...update }));
  }
}
