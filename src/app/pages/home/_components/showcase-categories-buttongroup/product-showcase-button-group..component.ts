import { Component, ElementRef, inject, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-showcase-button-group',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-showcase-button-group.component.html',
  styleUrls: ['./product-showcase-button-group.component.css'],
})
export class ProductShowcaseButtonGroupComponent implements AfterViewInit {
  @ViewChild('buttonGroup') buttonGroup!: ElementRef;
  productService = inject(ProductService);
  categories$: Observable<string[]> = this.productService.fetchCategories();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.buttonGroup && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.buttonGroup.nativeElement, 'in-viewport');
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(this.buttonGroup.nativeElement);
    }
  }
}
